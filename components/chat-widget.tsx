"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import posthog from "posthog-js";

const PURPLE_GLOW = "#a78bfa";
const PURPLE_NEON = "#7c3aed";

/**
 * variant="quiz"  → kis play háromszög, kérdőív oldalon
 * variant="main"  → "E" betűs kör, főoldalon és minden oldalon
 */
export default function ChatWidget({ variant = "quiz" }: { variant?: "quiz" | "main" }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processorRef = useRef<any>(null);

  const disconnect = useCallback(() => {
    if (wsRef.current) { wsRef.current.close(); wsRef.current = null; }
    if (mediaStreamRef.current) { mediaStreamRef.current.getTracks().forEach((t) => t.stop()); mediaStreamRef.current = null; }
    if (processorRef.current) { processorRef.current.disconnect(); processorRef.current = null; }
    if (audioContextRef.current) { audioContextRef.current.close(); audioContextRef.current = null; }
    setIsConnected(false);
    setIsSpeaking(false);
    setIsLoading(false);
  }, []);

  const connect = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/voice-agent");
      if (!response.ok) throw new Error("Signed URL failed");
      const { signed_url } = await response.json();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const audioContext = new AudioContext({ sampleRate: 16000 });
      audioContextRef.current = audioContext;

      const ws = new WebSocket(signed_url);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        setIsLoading(false);

        const source = audioContext.createMediaStreamSource(stream);
        const processor = audioContext.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;

        processor.onaudioprocess = (e: AudioProcessingEvent) => {
          if (ws.readyState === WebSocket.OPEN) {
            const inputData = e.inputBuffer.getChannelData(0);
            const pcm16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) {
              pcm16[i] = Math.max(-32768, Math.min(32767, inputData[i] * 32768));
            }
            const base64 = btoa(String.fromCharCode(...new Uint8Array(pcm16.buffer)));
            ws.send(JSON.stringify({ user_audio_chunk: base64 }));
          }
        };

        source.connect(processor);
        processor.connect(audioContext.destination);
        posthog.capture("voice_agent_started", { page: variant });
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "audio") {
          setIsSpeaking(true);
          const audioData = atob(data.audio_event?.audio_base_64 || data.audio?.chunk || "");
          const audioArray = new Uint8Array(audioData.length);
          for (let i = 0; i < audioData.length; i++) audioArray[i] = audioData.charCodeAt(i);
          const audioBlob = new Blob([audioArray], { type: "audio/mpeg" });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.play().catch(() => {});
          audio.onended = () => { URL.revokeObjectURL(audioUrl); setIsSpeaking(false); };
        }
        if (data.type === "agent_response") setIsSpeaking(true);
        if (data.type === "user_transcript") setIsSpeaking(false);
      };

      ws.onclose = () => { disconnect(); posthog.capture("voice_agent_ended", { page: variant }); };
      ws.onerror = () => { disconnect(); };
    } catch {
      setIsLoading(false);
      setIsConnected(false);
    }
  }, [disconnect, variant]);

  const handleClick = () => {
    if (isLoading) return;
    if (isConnected) disconnect();
    else connect();
  };

  useEffect(() => { return () => { disconnect(); }; }, [disconnect]);

  /* ── SIZE & POSITION ── */
  const size = variant === "quiz" ? 44 : 52;
  const glowInset = variant === "quiz" ? -4 : -5;

  /* ── NEON INTENSITY based on state ── */
  const glowIntensity = isSpeaking ? 0.55 : isConnected ? 0.35 : 0.2;
  const borderColor = isConnected ? PURPLE_GLOW : PURPLE_NEON;
  const bgOpacity = isSpeaking ? 0.2 : isConnected ? 0.12 : 0.06;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative">
        {/* Outer glow ring — subtle neon pulse */}
        <span
          className="absolute rounded-full"
          style={{
            inset: glowInset,
            border: `1px solid rgba(109, 40, 217, ${glowIntensity * 0.4})`,
            animation: isConnected ? "voice-breathe 2.5s ease-in-out infinite" : "voice-glow 3s ease-in-out infinite",
          }}
        />

        {/* Button */}
        <button
          onClick={handleClick}
          aria-label="Beszélgetés az AI asszisztenssel"
          className="relative flex items-center justify-center transition-all duration-500"
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            border: `1.5px solid ${borderColor}`,
            backgroundColor: `rgba(109, 40, 217, ${bgOpacity})`,
            boxShadow: `0 0 ${isSpeaking ? 35 : 18}px rgba(109, 40, 217, ${glowIntensity}), 0 0 ${isSpeaking ? 70 : 40}px rgba(109, 40, 217, ${glowIntensity * 0.4})`,
            cursor: isLoading ? "wait" : "pointer",
            transition: "box-shadow 0.5s ease, background-color 0.5s ease, border-color 0.5s ease",
          }}
        >
          {isLoading ? (
            /* Loading spinner */
            <svg width={size * 0.36} height={size * 0.36} viewBox="0 0 24 24" fill="none" stroke={PURPLE_GLOW} strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" strokeDasharray="31.4 31.4">
                <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
              </circle>
            </svg>
          ) : variant === "main" ? (
            /* "E" letter for main site */
            <span
              style={{
                color: PURPLE_GLOW,
                fontSize: size * 0.4,
                fontWeight: 600,
                fontFamily: "Arial, Helvetica, sans-serif",
                lineHeight: 1,
                opacity: isSpeaking ? 1 : 0.85,
                transition: "opacity 0.5s ease",
              }}
            >
              E
            </span>
          ) : (
            /* Play triangle for quiz page */
            <svg width={size * 0.36} height={size * 0.36} viewBox="0 0 24 24" fill="none">
              <polygon
                points="8,4 20,12 8,20"
                fill={PURPLE_GLOW}
                opacity={isSpeaking ? 1 : 0.85}
                style={{ transition: "opacity 0.5s ease" }}
              />
            </svg>
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes voice-breathe {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.08); }
        }
        @keyframes voice-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.06); }
        }
      `}</style>
    </div>
  );
}
