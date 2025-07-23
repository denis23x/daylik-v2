export function getHighlightsSizes(
  c: number,
  i: number
): {
  scale80: string;
  scale90: string;
  right: string;
  left: string;
} {
  const first = i === 0;
  const last = i === c - 1;

  const scale80 = first || last ? 'scale-80-3d hidden sm:block' : '';
  const scale90 = i === 1 || i === c - 2 ? 'scale-90-3d origin-bottom' : '';
  const right = first ? 'origin-bottom-right' : '';
  const left = last ? 'origin-bottom-left' : '';

  return { scale80, scale90, right, left };
}
