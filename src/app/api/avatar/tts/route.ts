import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface TTSRequestBody {
  text: string;
  voiceId?: string;
  provider?: 'elevenlabs' | 'openai' | 'auto';
}

/**
 * Text-to-Speech API Route for SAM.exe
 *
 * Supports:
 * 1. ElevenLabs (Voice cloning / custom authorized voice model) via ELEVENLABS_API_KEY
 * 2. OpenAI Audio Speech via OPENAI_API_KEY
 * 3. Fallback indication for client-side Web Audio synthesis
 */
export async function POST(request: NextRequest) {
  try {
    const body: TTSRequestBody = await request.json();
    const text = body.text?.trim();

    if (!text) {
      return NextResponse.json({ error: 'Missing text in request' }, { status: 400 });
    }

    // Limit text length to prevent abuse (e.g. max 500 characters per utterance)
    const sanitizedText = text.slice(0, 500);

    const elevenLabsKey = process.env.ELEVENLABS_API_KEY?.trim();
    const elevenLabsVoiceId = body.voiceId || process.env.ELEVENLABS_VOICE_ID?.trim() || 'pNInz6obpgDQGcFmaJgB'; // Adam / Custom voice

    const openAiKey = process.env.OPENAI_API_KEY?.trim();
    const openAiVoice = process.env.OPENAI_TTS_VOICE?.trim() || 'onyx'; // Deep masculine voice

    // 1. ElevenLabs Provider
    if (elevenLabsKey && (body.provider === 'elevenlabs' || !body.provider || body.provider === 'auto')) {
      try {
        const response = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${elevenLabsVoiceId}?output_format=mp3_44100_128`,
          {
            method: 'POST',
            headers: {
              'xi-api-key': elevenLabsKey,
              'Content-Type': 'application/json',
              Accept: 'audio/mpeg',
            },
            body: JSON.stringify({
              text: sanitizedText,
              model_id: 'eleven_turbo_v2_5',
              voice_settings: {
                stability: 0.5,
                similarity_boost: 0.85,
              },
            }),
            signal: AbortSignal.timeout(15000),
          }
        );

        if (response.ok) {
          const audioBuffer = await response.arrayBuffer();
          return new NextResponse(audioBuffer, {
            status: 200,
            headers: {
              'Content-Type': 'audio/mpeg',
              'Cache-Control': 'public, max-age=3600',
            },
          });
        }
        console.warn(`[tts] ElevenLabs responded with ${response.status}`);
      } catch (err) {
        console.error('[tts] ElevenLabs error:', err);
      }
    }

    // 2. OpenAI TTS Provider
    if (openAiKey && (body.provider === 'openai' || !body.provider || body.provider === 'auto')) {
      try {
        const response = await fetch('https://api.openai.com/v1/audio/speech', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${openAiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'tts-1',
            input: sanitizedText,
            voice: openAiVoice,
            response_format: 'mp3',
          }),
          signal: AbortSignal.timeout(15000),
        });

        if (response.ok) {
          const audioBuffer = await response.arrayBuffer();
          return new NextResponse(audioBuffer, {
            status: 200,
            headers: {
              'Content-Type': 'audio/mpeg',
              'Cache-Control': 'public, max-age=3600',
            },
          });
        }
        console.warn(`[tts] OpenAI TTS responded with ${response.status}`);
      } catch (err) {
        console.error('[tts] OpenAI TTS error:', err);
      }
    }

    // 3. Fallback indication
    // Return structured JSON informing the client to synthesize audio locally using Web Speech API or AudioBuffer
    return NextResponse.json({
      fallback: true,
      text: sanitizedText,
      message:
        'No server-side TTS credentials detected (ELEVENLABS_API_KEY or OPENAI_API_KEY). Using client-side speech synthesis.',
    });
  } catch (error) {
    console.error('[tts] Unexpected error:', error);
    return NextResponse.json({ error: 'tts_failed' }, { status: 500 });
  }
}
