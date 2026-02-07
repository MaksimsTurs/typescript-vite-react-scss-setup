import type { Dictionary } from "@root/global.type";

import PathNotMatchPatternError from "./Path-Not-Match-Pattern-Error.util";

import { isUndefined } from "@util/is.util";
import hasDynamicPart from "./has-dynamic-part.util";

export default function getParamsFromPath<P extends string>(pattern?: string, path?: string): Dictionary<P, string> {
  const params: Dictionary<P, string> = {};

  if(isUndefined(pattern) || isUndefined(path)) {
    return params;
  }

  const patternParts: string[] = pattern.split("/").filter(Boolean);
  const pathParts: string[] = path.split("/").filter(Boolean);

  if(patternParts.length !== pathParts.length) {
    throw new PathNotMatchPatternError(pattern, path);
  }

  for(let index: number = 0; index < patternParts.length; index++) {
    if(hasDynamicPart(patternParts[index])) {
      const key: P = patternParts[index].replace(/\:/, "").trim() as P;

      if(Object.hasOwn(params, key)) {
        console.warn(`Key "${key}" alredy exist in path "${path}"!`);
      } else {
        params[key] = pathParts[index];
      }
    } else if(patternParts[index] !== pathParts[index]) {
      throw new PathNotMatchPatternError(pattern, path);
    }
  }
  
  return params;
};