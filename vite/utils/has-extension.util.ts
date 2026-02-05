export default function hasExtension(extension: string, path: string): boolean {
  return new RegExp(`.${extension}`).test(path);
};