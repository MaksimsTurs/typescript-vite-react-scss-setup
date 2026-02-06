import hasDynamicPart from "./has-dynamic-part.util";

export default function isPathMatchPattern(pattern: string, path?: string): boolean {
  if(!path) {
    return false;
  }

  // If pattern does not have dynamic parts, we can do simple string comparison.
  if(!hasDynamicPart(pattern)) {
    return pattern === path;
  }

  const patternParts: string[] = pattern.split("/").filter(Boolean);
  const pathParts: string[] = path.split("/").filter(Boolean);

  // If pattern and path have different count of parts, path does not match 
  // the pattern.
  if(patternParts.length != pathParts.length) {
    return false;
  }

  let dynamicPartsCount: number = 0;
  let staticPartsCount: number = 0;

  for(let index: number = 0; index < patternParts.length; index++) {
    if(hasDynamicPart(patternParts[index])) {
      dynamicPartsCount++;
    } else {
      if(patternParts[index] !== pathParts[index]) {
        return false;
      }

      staticPartsCount++;
    }
  }

  return (patternParts.length - dynamicPartsCount) === staticPartsCount;
};