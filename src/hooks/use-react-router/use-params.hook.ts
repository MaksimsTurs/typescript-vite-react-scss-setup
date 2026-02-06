import type { ReactRouterContextValue } from "./types/use-react-router.type";
import type { UseParamsReturn } from "./types/use-params.type";

import { useContext } from "react";

import { ReactRouterContext } from "./components/Routes.component";

import getParamsFromPath from "./utils/get-params-from-path.util";
import isPathMatchPattern from "./utils/is-path-match-pattern.util";

import ExecutionOutsideContextError from "./utils/Execution-Outside-Context-Error.util";

export default function useParams<P extends string>(): UseParamsReturn<P> {
  const context: ReactRouterContextValue<any> | undefined = useContext<ReactRouterContextValue<any> | undefined>(ReactRouterContext);
  
  if(!context) {
    throw new ExecutionOutsideContextError();
  }

  const currentPath: string | undefined = context.paths.at(-1);
  const currentPattern: string | undefined = context.patterns
    .keys()
    .filter(pattern => isPathMatchPattern(pattern, currentPath))
    .toArray()
    .at(0);

  return getParamsFromPath<P>(currentPattern, currentPath)
};