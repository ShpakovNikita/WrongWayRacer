export const lerp = (start: number, end: number, amt: number) => {
  return start + (end - start) * amt;
};
