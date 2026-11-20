import { describe, expect, it } from 'vitest';
import { readTextStream } from './read-text-stream';

describe('readTextStream', () => {
  it('returns the full response and emits incremental chunks', async () => {
    const encoder = new TextEncoder();
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode('Hello '));
        controller.enqueue(encoder.encode('SAM.exe'));
        controller.close();
      },
    });
    const chunks: string[] = [];
    const result = await readTextStream(new Response(body), (chunk) => chunks.push(chunk));

    expect(result).toBe('Hello SAM.exe');
    expect(chunks).toEqual(['Hello ', 'SAM.exe']);
  });

  it('returns an empty string when the response has no body', async () => {
    expect(await readTextStream(new Response(null))).toBe('');
  });
});
