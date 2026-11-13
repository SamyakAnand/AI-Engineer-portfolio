/**
 * AudioIntegration.ts
 *
 * Dedicated audio provider abstraction for SAM.exe & Talking Avatar.
 * Handles:
 * 1. AI Voice (Server-side ElevenLabs with cloned voice or OpenAI TTS)
 * 2. Original Voice Reference (Testing authentic private samples from public/voice/sam-reference/)
 * 3. Microphone stream attachment (for live audio-driven lip sync)
 *
 * STRICT REQUIREMENT:
 * All audio playback is delegated directly to avatar.speak(blob | url) or avatar.attachStream(stream).
 * Audio is NEVER played through a secondary <audio> element to prevent echo/duplicate playback.
 */

export interface VoiceReferenceFile {
  filename: string;
  url: string;
  sizeBytes: number;
  lastModified: number;
}

export type VoiceMode = 'ai_tts' | 'reference' | 'mic_mirror';

export interface TalkingAvatarInstance {
  speak: (audio: string | ArrayBuffer | Blob) => Promise<void>;
  stopSpeaking: () => void;
  attachStream: (stream: MediaStream) => Promise<void>;
  detachStream: () => void;
  setStatus: (status: 'listening' | 'thinking') => void;
  ready: Promise<void>;
}

export class SamAudioService {
  private isSpeaking = false;
  private currentMode: VoiceMode = 'ai_tts';
  private selectedReferenceFile: string | null = null;
  private onStatusChange?: (isSpeaking: boolean) => void;

  constructor(callbacks?: { onStatusChange?: (isSpeaking: boolean) => void }) {
    this.onStatusChange = callbacks?.onStatusChange;
  }

  public setMode(mode: VoiceMode) {
    this.currentMode = mode;
  }

  public getMode(): VoiceMode {
    return this.currentMode;
  }

  public setSelectedReference(filename: string | null) {
    this.selectedReferenceFile = filename;
  }

  public getSelectedReference(): string | null {
    return this.selectedReferenceFile;
  }

  /**
   * Fetch available voice reference files from the private reference folder.
   */
  public async fetchVoiceReferences(): Promise<VoiceReferenceFile[]> {
    try {
      const res = await fetch('/api/avatar/voice-references');
      if (!res.ok) return [];
      const data = await res.json();
      return data.files || [];
    } catch (err) {
      console.warn('[SamAudioService] Could not fetch voice references:', err);
      return [];
    }
  }

  /**
   * Main speech execution pipeline.
   * Feeds audio directly into the TalkingAvatar instance.
   */
  public async speak(
    text: string,
    avatar: TalkingAvatarInstance,
    options?: { overrideFile?: string; provider?: 'elevenlabs' | 'openai' | 'auto' }
  ): Promise<void> {
    if (!avatar) return;

    // Mode 1: Authentic Voice Reference Testing
    if (this.currentMode === 'reference' || options?.overrideFile) {
      const fileUrl = options?.overrideFile || this.selectedReferenceFile || '/voice/sam-reference/sam-welcome-sample.wav';
      try {
        this.setSpeaking(true);
        avatar.setStatus('listening');
        await avatar.speak(fileUrl);
      } catch (err) {
        console.error('[SamAudioService] Reference audio playback failed:', err);
      } finally {
        this.setSpeaking(false);
      }
      return;
    }

    // Mode 2: AI Voice (TTS)
    try {
      this.setSpeaking(true);
      avatar.setStatus('thinking');

      const res = await fetch('/api/avatar/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          provider: options?.provider || 'auto',
        }),
      });

      const contentType = res.headers.get('content-type') || '';

      if (res.ok && contentType.includes('audio/')) {
        const audioBlob = await res.blob();
        avatar.setStatus('listening'); // avatar will auto-switch to speaking as audio sounds
        await avatar.speak(audioBlob);
      } else {
        // Fallback or unconfigured cloud TTS
        await res.json().catch(() => ({}));
        
        // Generate a clean speech audio blob locally or use local reference audio
        const fallbackBlob = await this.generateFallbackAudio(text);
        if (fallbackBlob) {
          await avatar.speak(fallbackBlob);
        } else {
          // If audio generation isn't supported, play the reference intro sample so the mouth still moves
          await avatar.speak('/voice/sam-reference/sam-welcome-sample.wav');
        }
      }
    } catch (err) {
      console.error('[SamAudioService] Failed to speak text:', err);
    } finally {
      this.setSpeaking(false);
      avatar.setStatus('listening');
    }
  }

  public stop(avatar: TalkingAvatarInstance) {
    if (!avatar) return;
    try {
      avatar.stopSpeaking();
      avatar.detachStream();
    } catch (err) {
      console.warn('[SamAudioService] Stop speaking warning:', err);
    } finally {
      this.setSpeaking(false);
      avatar.setStatus('listening');
    }
  }

  private setSpeaking(status: boolean) {
    this.isSpeaking = status;
    this.onStatusChange?.(status);
  }

  /**
   * Generates a lightweight synthetic audio WAV blob in the browser
   * with vocal formants matched to the input length, allowing lip-sync
   * even when no cloud TTS API key is present.
   */
  private async generateFallbackAudio(text: string): Promise<Blob | null> {
    if (typeof window === 'undefined') return null;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;

      // Approximate speech duration based on word count (approx 130 words per minute ~ 460ms per word)
      const words = text.trim().split(/\s+/).length;
      const durationSeconds = Math.max(1.8, Math.min(12, words * 0.38));
      const sampleRate = 16000;
      const numSamples = Math.floor(sampleRate * durationSeconds);

      // Create an offline context to render vocal sounds
      const offlineCtx = new OfflineAudioContext(1, numSamples, sampleRate);

      // Synthesize harmonic carrier with speech-like modulation
      const osc = offlineCtx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(125, 0); // Fundamental male pitch (~125 Hz)
      
      // Pitch inflection over time
      osc.frequency.exponentialRampToValueAtTime(140, durationSeconds * 0.3);
      osc.frequency.exponentialRampToValueAtTime(115, durationSeconds * 0.8);
      osc.frequency.exponentialRampToValueAtTime(100, durationSeconds);

      // Formant bandpass filters to mimic vocal tract (F1 ~ 500Hz, F2 ~ 1500Hz)
      const filter = offlineCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(650, 0);
      filter.Q.setValueAtTime(3, 0);

      // Amplitude envelope matching syllables
      const gain = offlineCtx.createGain();
      gain.gain.setValueAtTime(0.01, 0);

      const syllableCount = Math.floor(words * 2.2);
      const sylStep = durationSeconds / syllableCount;
      for (let i = 0; i < syllableCount; i++) {
        const t = i * sylStep;
        gain.gain.setValueAtTime(0.01, t);
        gain.gain.linearRampToValueAtTime(0.45, t + sylStep * 0.35);
        gain.gain.linearRampToValueAtTime(0.02, t + sylStep * 0.9);
      }

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(offlineCtx.destination);

      osc.start(0);
      osc.stop(durationSeconds);

      const renderedBuffer = await offlineCtx.startRendering();
      return this.audioBufferToWav(renderedBuffer);
    } catch (e) {
      console.warn('[SamAudioService] Local audio rendering failed:', e);
      return null;
    }
  }

  /**
   * Encodes AudioBuffer into standard RIFF WAV Blob for TalkingAvatar.
   */
  private audioBufferToWav(buffer: AudioBuffer): Blob {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    const channelData = buffer.getChannelData(0);
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = channelData.length * bytesPerSample;
    const headerSize = 44;
    const totalSize = headerSize + dataSize;

    const arrayBuffer = new ArrayBuffer(totalSize);
    const view = new DataView(arrayBuffer);

    function writeString(offset: number, string: string) {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    }

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(36, 'data');
    view.setUint32(40, dataSize, true);

    let offset = 44;
    for (let i = 0; i < channelData.length; i++) {
      const s = Math.max(-1, Math.min(1, channelData[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      offset += 2;
    }

    return new Blob([view], { type: 'audio/wav' });
  }
}
