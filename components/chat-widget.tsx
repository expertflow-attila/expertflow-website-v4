"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import posthog from "posthog-js";

/**
 * Voice Agent Widget — Gemini 3.1 Flash Live
 * Sötét, elegáns ikon — illeszkedik az Expert Flow brandinghez
 */
export default function ChatWidget({ variant = "main" }: { variant?: "quiz" | "main" }) {
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

      // 1. Get config from server (includes system instruction + knowledge)
      const response = await fetch("/api/voice-agent");
      if (!response.ok) throw new Error("Config failed");
      const config = await response.json();

      // 2. Open Gemini Live WebSocket
      const wsUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${config.apiKey}`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      // 3. Audio setup
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { sampleRate: 16000, channelCount: 1, echoCancellation: true, noiseSuppression: true }
      });
      mediaStreamRef.current = stream;
      const audioContext = new AudioContext({ sampleRate: 16000 });
      audioContextRef.current = audioContext;

      ws.onopen = () => {
        // Send setup message
        ws.send(JSON.stringify({
          setup: {
            model: `models/${config.model}`,
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: config.config.speechConfig,
              thinkingConfig: { thinkingLevel: config.config.generationConfig?.thinkingLevel || "low" },
              temperature: config.config.generationConfig?.temperature || 0.7,
            },
            systemInstruction: {
              parts: [{ text: config.systemInstruction }]
            },
          }
        }));
      };

      ws.onmessage = (event) => {
        if (typeof event.data === "string") {
          const data = JSON.parse(event.data);

          // Setup complete
          if (data.setupComplete) {
            setIsConnected(true);
            setIsLoading(false);
            startAudioCapture(ws, audioContext, stream);
            posthog.capture("voice_agent_started", { page: variant, model: "gemini-3.1-flash-live" });
            return;
          }

          // Server content (audio response)
          if (data.serverContent?.modelTurn?.parts) {
            for (const part of data.serverContent.modelTurn.parts) {
              if (part.inlineData?.mimeType?.startsWith("audio/")) {
                setIsSpeaking(true);
                playAudioChunk(part.inlineData.data, part.inlineData.mimeType);
              }
            }
          }

          // Turn complete
          if (data.serverContent?.turnComplete) {
            setIsSpeaking(false);
          }
        }
      };

      ws.onclose = () => {
        disconnect();
        posthog.capture("voice_agent_ended", { page: variant });
      };
      ws.onerror = () => { disconnect(); };
    } catch {
      setIsLoading(false);
      setIsConnected(false);
    }
  }, [disconnect, variant]);

  function startAudioCapture(ws: WebSocket, audioContext: AudioContext, stream: MediaStream) {
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
        ws.send(JSON.stringify({
          realtimeInput: {
            mediaChunks: [{ mimeType: "audio/pcm;rate=16000", data: base64 }]
          }
        }));
      }
    };

    source.connect(processor);
    processor.connect(audioContext.destination);
  }

  function playAudioChunk(base64Data: string, mimeType: string) {
    try {
      const audioData = atob(base64Data);
      const audioArray = new Uint8Array(audioData.length);
      for (let i = 0; i < audioData.length; i++) audioArray[i] = audioData.charCodeAt(i);
      const audioBlob = new Blob([audioArray], { type: mimeType });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play().catch(() => {});
      audio.onended = () => { URL.revokeObjectURL(audioUrl); setIsSpeaking(false); };
    } catch {
      // Audio decode hiba — nem kritikus
    }
  }

  const handleClick = () => {
    if (isLoading) return;
    if (isConnected) disconnect();
    else connect();
  };

  useEffect(() => { return () => { disconnect(); }; }, [disconnect]);

  /* ── SIZE ── */
  const size = variant === "quiz" ? 40 : 44;

  /* ── STATE-BASED STYLING ── */
  const ringOpacity = isSpeaking ? 0.6 : isConnected ? 0.3 : 0;
  const bgColor = isConnected
    ? "rgba(24, 24, 27, 0.95)"
    : "rgba(24, 24, 27, 0.88)";
  const borderColor = isSpeaking
    ? "rgba(161, 161, 170, 0.4)"
    : isConnected
    ? "rgba(161, 161, 170, 0.25)"
    : "rgba(161, 161, 170, 0.12)";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative group">
        {/* Tooltip */}
        {!isConnected && (
          <span className="absolute bottom-full right-0 mb-2 px-3 py-1.5 text-xs
            bg-zinc-900 text-zinc-300 rounded-md border border-zinc-800
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
            whitespace-nowrap pointer-events-none">
            Beszélj az AI asszisztenssel
          </span>
        )}

        {/* Pulse ring (only when connected) */}
        {isConnected && (
          <span
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: -4,
              border: `1px solid rgba(161, 161, 170, ${ringOpacity})`,
              animation: isSpeaking
                ? "voice-breathe 1.8s ease-in-out infinite"
                : "voice-pulse 3s ease-in-out infinite",
            }}
          />
        )}

        {/* Button */}
        <button
          onClick={handleClick}
          aria-label="Beszélgetés az AI asszisztenssel"
          className="relative flex items-center justify-center transition-all duration-300"
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            border: `1px solid ${borderColor}`,
            backgroundColor: bgColor,
            backdropFilter: "blur(12px)",
            boxShadow: isConnected
              ? `0 0 20px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)`
              : `0 1px 4px rgba(0,0,0,0.2)`,
            cursor: isLoading ? "wait" : "pointer",
          }}
        >
          {isLoading ? (
            /* Loading spinner */
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" strokeDasharray="31.4 31.4">
                <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
              </circle>
            </svg>
          ) : isSpeaking ? (
            /* Speaking — sound wave bars */
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <rect x="4" y="8" width="2" height="8" rx="1" fill="#d4d4d8">
                <animate attributeName="height" values="8;14;8" dur="0.8s" repeatCount="indefinite" />
                <animate attributeName="y" values="8;5;8" dur="0.8s" repeatCount="indefinite" />
              </rect>
              <rect x="9" y="5" width="2" height="14" rx="1" fill="#d4d4d8">
                <animate attributeName="height" values="14;6;14" dur="0.6s" repeatCount="indefinite" />
                <animate attributeName="y" values="5;9;5" dur="0.6s" repeatCount="indefinite" />
              </rect>
              <rect x="14" y="7" width="2" height="10" rx="1" fill="#d4d4d8">
                <animate attributeName="height" values="10;16;10" dur="0.7s" repeatCount="indefinite" />
                <animate attributeName="y" values="7;4;7" dur="0.7s" repeatCount="indefinite" />
              </rect>
              <rect x="19" y="9" width="2" height="6" rx="1" fill="#d4d4d8">
                <animate attributeName="height" values="6;12;6" dur="0.9s" repeatCount="indefinite" />
                <animate attributeName="y" values="9;6;9" dur="0.9s" repeatCount="indefinite" />
              </rect>
            </svg>
          ) : isConnected ? (
            /* Connected — mic icon */
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#d4d4d8" strokeWidth="1.5" strokeLinecap="round">
              <rect x="9" y="2" width="6" height="12" rx="3" />
              <path d="M5 10a7 7 0 0 0 14 0" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          ) : (
            /* Idle — sound wave icon */
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round">
              <line x1="4" y1="8" x2="4" y2="16" />
              <line x1="8" y1="5" x2="8" y2="19" />
              <line x1="12" y1="3" x2="12" y2="21" />
              <line x1="16" y1="5" x2="16" y2="19" />
              <line x1="20" y1="8" x2="20" y2="16" />
            </svg>
          )}
        </button>
      </div>

    </div>
  );
}
