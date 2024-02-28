
export default function divideLargeNumber(price) {
  const numberString = String(price);
  const dividedParts = [];

  // Divide the number into groups of three digits from right to left
  for (let i = numberString.length - 1; i >= 0; i -= 3) {
    const start = Math.max(0, i - 2);
    const part = numberString.substring(start, i + 1);
    dividedParts.unshift(part);
  }

  return dividedParts.join(" ");
}
