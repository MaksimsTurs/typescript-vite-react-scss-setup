import type { Dictionary } from "@root/global.type";

import PathNotMatchPatternError from "./Path-Not-Match-Pattern-Error.util";

export default function getParamsFromPath<P extends string>(pattern?: string, path?: string): Dictionary<P, string> {
  const params: Dictionary<P, string> = {};

  if(!path || !pattern) {
    return params;
  }

  const patternParts: string[] = pattern.split("/").filter(Boolean);
  const pathParts: string[] = path.split("/").filter(Boolean);

  if(patternParts.length !== pathParts.length) {
    throw new PathNotMatchPatternError(pattern, path);
  }

  for(let index: number = 0; index < patternParts.length; index++) {
    if(/\:/.test(patternParts[index])) {
      const name: P = patternParts[index].replace(/\:/, "").trim() as P;

      params[name] = pathParts[index];
    }
  }
  
  return params;
};