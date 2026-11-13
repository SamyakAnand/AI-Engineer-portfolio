'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

// Web Speech API interface declarations for TypeScript
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionErrorEvent) => void) | null;
  onend: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

interface MicrophoneControllerProps {
  onTranscript: (transcript: string) => void;
  onLiveStream?: (stream: MediaStream | null) => void;
  isProcessing?: boolean;
}

export default function MicrophoneController({
  onTranscript,
  onLiveStream,
  isProcessing = false,
}: MicrophoneControllerProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isLiveMirroring, setIsLiveMirroring] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [supported, setSupported] = useState(true);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      setSupported(false);
    }
  }, []);

  const stopAllAudio = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch {
        // ignore
      }
      audioContextRef.current = null;
    }

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    setIsRecording(false);
    setIsLiveMirroring(false);
    setAudioLevel(0);
    onLiveStream?.(null);
  }, [onLiveStream]);

  // Start speech recognition + audio level visualizer
  const startRecording = async () => {
    if (isRecording) {
      stopAllAudio();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;

      // Setup audio analyzer for reactive glowing visualizer
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        setAudioLevel(Math.min(1, average / 128));
        animFrameRef.current = requestAnimationFrame(updateVolume);
      };
      updateVolume();

      // Setup Speech Recognition
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRec) {
        const recognition = new SpeechRec();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        let finalTranscript = '';

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let interim = '';
          for (let i = 0; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interim += event.results[i][0].transcript;
            }
          }
          const spoken = (finalTranscript || interim).trim();
          if (spoken) {
            onTranscript(spoken);
          }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.warn('[Microphone] Recognition error:', event.error);
          stopAllAudio();
        };

        recognition.onend = () => {
          stopAllAudio();
        };

        recognition.start();
        recognitionRef.current = recognition;
        setIsRecording(true);
      } else {
        setIsRecording(true);
      }
    } catch (err) {
      console.error('[Microphone] Failed to access microphone:', err);
      stopAllAudio();
    }
  };

  // Toggle live microphone stream mirroring to avatar.attachStream
  const toggleLiveMirroring = async () => {
    if (isLiveMirroring) {
      stopAllAudio();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;
      setIsLiveMirroring(true);
      onLiveStream?.(stream);
    } catch (err) {
      console.error('[Microphone] Live mirror mic failed:', err);
      stopAllAudio();
    }
  };

  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, [stopAllAudio]);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={startRecording}
        disabled={isProcessing || !supported}
        title={isRecording ? 'Stop listening' : 'Speak to SAM.exe'}
        aria-label={isRecording ? 'Stop microphone' : 'Start microphone speech input'}
        className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
          isRecording
            ? 'bg-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.6)] scale-105'
            : 'bg-white/5 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
        } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isRecording && (
          <span
            className="absolute inset-0 rounded-full border-2 border-rose-400 animate-ping opacity-75"
            style={{
              transform: `scale(${1 + audioLevel * 0.7})`,
            }}
          />
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {isRecording ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          )}
        </svg>
      </button>

      {/* Live Mic Lip-Sync Mirroring Pill */}
      <button
        type="button"
        onClick={toggleLiveMirroring}
        title="Live Lip-Sync: speak into your mic and SAM.exe mirrors your mouth shapes live"
        className={`px-2.5 py-1 text-[10px] font-mono tracking-wider rounded-full border transition-all ${
          isLiveMirroring
            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.3)] animate-pulse'
            : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:border-white/30'
        }`}
      >
        {isLiveMirroring ? '● LIVE SYNC ON' : 'MIC SYNC'}
      </button>
    </div>
  );
}
