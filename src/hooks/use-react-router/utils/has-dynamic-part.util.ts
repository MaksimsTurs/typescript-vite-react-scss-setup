export default function hasDynamicPart(pattern: string): boolean {
  return /\:/g.test(pattern);
};