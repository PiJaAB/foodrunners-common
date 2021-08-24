function segmentArr<T>(arr: T[], length: number) {
  const segments = new Array<T[]>(Math.ceil(arr.length / length));
  for (let i = 0; i < segments.length; i++) {
    segments[i] = arr.slice(i * length, (i + 1) * length);
  }
  return segments;
}

function segmentIterator<T>(
  arr: { [Symbol.iterator]: () => IterableIterator<T> },
  length: number,
) {
  const segments = new Array<T[]>();
  let i = 0;
  let cur: T[] = [];
  const iterator = (arr as readonly T[])[Symbol.iterator]();
  let itRes: IteratorResult<T, unknown>;
  // eslint-disable-next-line no-cond-assign
  while (!(itRes = iterator.next()).done) {
    const el = itRes.value;
    if (i % length === 0 && cur.length > 0) {
      segments.push(cur);
      cur = [];
    }
    cur.push(el);
    i += 1;
  }
  if (cur.length > 0) segments.push(cur);
  return segments;
}

export default function segment<T>(
  arr: IterableIterator<T> | T[] | readonly T[],
  length: number,
): T[][] {
  if (length <= 0) throw new RangeError('length must be a positive integer');
  if (Array.isArray(arr)) {
    return segmentArr(arr, length);
  }
  return segmentIterator(arr, length);
}
