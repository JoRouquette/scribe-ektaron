import { batchByBytes, jsonSizeBytes } from './batch-by-bytes.util';

describe('batchByBytes', () => {
  it('batches items without exceeding limit', () => {
    const items = ['a', 'b', 'c'];
    const batches = batchByBytes(items, 10, (batch) => ({ notes: batch }));
    expect(batches).toHaveLength(2);
    expect(batches[0]).toEqual(['a', 'b']);
    expect(batches[1]).toEqual(['c']);
  });

  it('throws when a single item exceeds the limit', () => {
    const items = ['long-string-exceeding-limit'];
    expect(() =>
      batchByBytes(items, 5, (batch) => ({ notes: batch }))
    ).toThrow();
  });

  it('computes json size in bytes', () => {
    const size = jsonSizeBytes({ text: 'é' });
    expect(size).toBeGreaterThan(0);
  });
});
