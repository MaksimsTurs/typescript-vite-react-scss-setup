import type { ReactRouterContextValue, RouteProps } from "../use-react-router.type";
import type { ReactNode } from "react";

import { ReactRouterContext } from "./Routes.component";

import { useContext } from "react";

import { isUndefined } from "@util/is.util";
import isPathMatchPattern from "../utils/is-path-match-pattern.util";

export default function Route<P extends string>({ path, protect, children, fallback }: RouteProps<P>): ReactNode {
  const context: ReactRouterContextValue<P> | undefined = useContext(ReactRouterContext);
  
  context?.addPattern(path);
  
  return(
    isUndefined(protect) ? 
      isPathMatchPattern(path, context?.path || "") ? 
        children :
      null :
    protect ? 
      fallback : 
      children
  );
};