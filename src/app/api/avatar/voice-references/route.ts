import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export const runtime = 'nodejs';

/**
 * Returns available private voice reference audio files in public/voice/sam-reference/
 * for local testing of authentic voice lip-sync with SAM.exe.
 */
export async function GET() {
  try {
    const dir = path.join(process.cwd(), 'public', 'voice', 'sam-reference');
    if (!fs.existsSync(dir)) {
      return NextResponse.json({ files: [] });
    }

    const files = fs
      .readdirSync(dir)
      .filter((file) => /\.(wav|mp3|ogg|m4a|aac)$/i.test(file))
      .map((filename) => {
        const fullPath = path.join(dir, filename);
        const stats = fs.statSync(fullPath);
        return {
          filename,
          url: `/voice/sam-reference/${encodeURIComponent(filename)}`,
          sizeBytes: stats.size,
          lastModified: stats.mtimeMs,
        };
      });

    return NextResponse.json({
      files,
      count: files.length,
      instructions:
        'To add your authentic voice recordings, place .wav or .mp3 files into public/voice/sam-reference/. They are git-ignored and stay local.',
    });
  } catch (error) {
    console.error('[voice-references] Error reading directory:', error);
    return NextResponse.json({ files: [], error: 'failed_to_list' }, { status: 500 });
  }
}
