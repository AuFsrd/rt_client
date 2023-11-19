export const signed = (n: number) => {
  return (n > 0) ? "+"+n : n;
}

export const sign = (n: number) => {
  if (n > 0) return "+";
  if (n < 0) return "-";
  return "";
}