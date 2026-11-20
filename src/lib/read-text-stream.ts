export async function readTextStream(
  response: Response,
  onChunk?: (chunk: string, accumulated: string) => void,
): Promise<string> {
  if (!response.body) return '';
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let result = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    if (!chunk) continue;
    result += chunk;
    onChunk?.(chunk, result);
  }

  const remainder = decoder.decode();
  if (remainder) {
    result += remainder;
    onChunk?.(remainder, result);
  }
  return result.trim();
}
