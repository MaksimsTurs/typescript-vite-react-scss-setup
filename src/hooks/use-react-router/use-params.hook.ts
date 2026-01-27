import type { ReactRouterContextValue } from "./use-react-router.type";
import type { UseParamsReturn } from "./use-params.type";

import { useContext } from "react";

import { ReactRouterContext } from "./components/Routes.component";

import getParamsFromPath from "./utils/get-params-from-path.util";
import isPathMatchPattern from "./utils/is-path-match-pattern.util";

export default function useParams<P extends string>(): UseParamsReturn<P> {
  const context: ReactRouterContextValue<any> | undefined = useContext<ReactRouterContextValue<any> | undefined>(ReactRouterContext);
  
  if(!context) {
    throw new Error("You should wrapp you App into Routes component!");
  }

  const currentPattern: string | undefined = context.patterns
    .keys()
    .filter(pattern => isPathMatchPattern(pattern, context.paths.at(-1)))
    .toArray()
    .at(0);

  return getParamsFromPath<P>(currentPattern || "", context.paths.at(-1))
};