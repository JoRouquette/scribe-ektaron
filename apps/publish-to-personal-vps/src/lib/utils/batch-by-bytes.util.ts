export type BatcherSizeFn<T> = (item: T) => number;

const encoder = new TextEncoder();

export function jsonSizeBytes(payload: unknown): number {
  const json = JSON.stringify(payload);
  return encoder.encode(json).byteLength;
}

export function batchByBytes<T>(
  items: T[],
  maxBytes: number,
  wrapBody: (batch: T[]) => unknown
): T[][] {
  if (maxBytes <= 0) {
    throw new Error('maxBytes must be > 0');
  }

  const batches: T[][] = [];
  let current: T[] = [];

  for (const [index, item] of items.entries()) {
    const tentative = [...current, item];
    const size = jsonSizeBytes(wrapBody(tentative));

    console.debug(
      `[batchByBytes] Item index: ${index}, tentative batch size: ${tentative.length}, bytes: ${size}, maxBytes: ${maxBytes}`
    );

    if (size <= maxBytes) {
      current = tentative;
      continue;
    }

    if (current.length === 0) {
      console.error(
        `[batchByBytes] Single item at index ${index} exceeds maxBytes limit (${size} > ${maxBytes})`
      );
      throw new Error('Single item exceeds maxBytes limit');
    }

    console.debug(
      `[batchByBytes] Finalizing batch of size ${current.length}, bytes: ${jsonSizeBytes(wrapBody(current))}`
    );
    batches.push(current);
    current = [item];
  }

  if (current.length > 0) {
    console.debug(
      `[batchByBytes] Finalizing last batch of size ${current.length}, bytes: ${jsonSizeBytes(wrapBody(current))}`
    );
    batches.push(current);
  }

  console.debug(`[batchByBytes] Total batches created: ${batches.length}`);
  return batches;
}
