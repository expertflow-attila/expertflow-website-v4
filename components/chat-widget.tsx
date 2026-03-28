"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import posthog from "posthog-js";

const PURPLE_GLOW = "#a78bfa";
const PURPLE_NEON = "#7c3aed";

export default function ChatWidget() {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsConnected(false);
    setIsSpeaking(false);
    setIsListening(false);
    setIsLoading(false);
  }, []);

  const connect = useCallback(async () => {
    try {
      setIsLoading(true);

      // Get signed URL via server proxy
      const response = await fetch("/api/voice-agent");
      if (!response.ok) throw new Error("Signed URL failed");
      const { signed_url } = await response.json();

      // Request microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      // Audio context
      const audioContext = new AudioContext({ sampleRate: 16000 });
      audioContextRef.current = audioContext;

      // Connect WebSocket
      const ws = new WebSocket(signed_url);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        setIsListening(true);
        setIsLoading(false);

        // Start sending audio
        const source = audioContext.createMediaStreamSource(stream);
        const processor = audioContext.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;

        processor.onaudioprocess = (e) => {
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
        posthog.capture("voice_agent_started", { page: "kerdoiv" });
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "audio") {
          setIsSpeaking(true);
          setIsListening(false);

          const audioData = atob(data.audio_event?.audio_base_64 || data.audio?.chunk || "");
          const audioArray = new Uint8Array(audioData.length);
          for (let i = 0; i < audioData.length; i++) {
            audioArray[i] = audioData.charCodeAt(i);
          }

          const audioBlob = new Blob([audioArray], { type: "audio/mpeg" });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.play().catch(() => {});
          audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
            setIsSpeaking(false);
            setIsListening(true);
          };
        }

        if (data.type === "agent_response") {
          setIsSpeaking(true);
          setIsListening(false);
        }

        if (data.type === "user_transcript") {
          setIsListening(true);
          setIsSpeaking(false);
        }
      };

      ws.onclose = () => {
        disconnect();
        posthog.capture("voice_agent_ended", { page: "kerdoiv" });
      };

      ws.onerror = () => {
        disconnect();
      };
    } catch {
      setIsLoading(false);
      setIsConnected(false);
    }
  }, [disconnect]);

  const handleClick = () => {
    if (isLoading) return;
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  useEffect(() => {
    return () => { disconnect(); };
  }, [disconnect]);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-3">
      {/* Outer glow ring */}
      <div className="relative">
        <span
          className="absolute rounded-full"
          style={{
            inset: -6,
            border: `1px solid rgba(109, 40, 217, 0.15)`,
            animation: isConnected ? "voice-pulse 2s ease-in-out infinite" : "voice-glow 3s ease-in-out infinite",
          }}
        />

        {/* Button */}
        <button
          onClick={handleClick}
          aria-label="Beszélgetés az AI asszisztenssel"
          className="relative flex items-center justify-center transition-all duration-300"
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: `1.5px solid ${isConnected ? PURPLE_GLOW : PURPLE_NEON}`,
            backgroundColor: isConnected
              ? "rgba(109, 40, 217, 0.2)"
              : "rgba(109, 40, 217, 0.08)",
            boxShadow: isConnected
              ? `0 0 30px rgba(109, 40, 217, 0.5), 0 0 60px rgba(109, 40, 217, 0.2), inset 0 0 20px rgba(109, 40, 217, 0.1)`
              : `0 0 20px rgba(109, 40, 217, 0.35), 0 0 50px rgba(109, 40, 217, 0.12)`,
            cursor: isLoading ? "wait" : "pointer",
          }}
        >
          {/* Icon states */}
          {isLoading ? (
            /* Loading spinner */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={PURPLE_GLOW} strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" strokeDasharray="31.4 31.4" strokeDashoffset="0">
                <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
              </circle>
            </svg>
          ) : isSpeaking ? (
            /* Speaking waves */
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="8" width="2" height="8" rx="1" fill={PURPLE_GLOW} style={{ animation: "wave 0.8s ease-in-out infinite" }} />
              <rect x="8" y="5" width="2" height="14" rx="1" fill={PURPLE_GLOW} style={{ animation: "wave 0.8s ease-in-out 0.1s infinite" }} />
              <rect x="12" y="7" width="2" height="10" rx="1" fill={PURPLE_GLOW} style={{ animation: "wave 0.8s ease-in-out 0.2s infinite" }} />
              <rect x="16" y="4" width="2" height="16" rx="1" fill={PURPLE_GLOW} style={{ animation: "wave 0.8s ease-in-out 0.3s infinite" }} />
              <rect x="20" y="9" width="2" height="6" rx="1" fill={PURPLE_GLOW} style={{ animation: "wave 0.8s ease-in-out 0.4s infinite" }} />
            </svg>
          ) : isListening ? (
            /* Microphone */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={PURPLE_GLOW} strokeWidth="1.5">
              <rect x="9" y="2" width="6" height="12" rx="3" />
              <path d="M5 10a7 7 0 0 0 14 0" />
              <line x1="12" y1="17" x2="12" y2="21" />
              <line x1="8" y1="21" x2="16" y2="21" />
            </svg>
          ) : (
            /* Play triangle */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <polygon points="8,4 20,12 8,20" fill={PURPLE_GLOW} opacity="0.9" />
            </svg>
          )}
        </button>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes voice-pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.35); opacity: 0; }
        }
        @keyframes voice-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes wave {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1.2); }
        }
      `}</style>
    </div>
  );
}
