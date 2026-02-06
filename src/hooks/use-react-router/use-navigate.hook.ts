import type { ReactRouterContextValue } from "./types/use-react-router.type";
import type { NavigateBack, UseNavigateReturn } from "./types/use-navigate.type";

import { useContext } from "react";

import { ReactRouterContext } from "./components/Routes.component";

import ExecutionOutsideContextError from "./utils/Execution-Outside-Context-Error.util";

export default function useNavigate(): UseNavigateReturn {
  const context: ReactRouterContextValue<any> | undefined = useContext<ReactRouterContextValue<any> | undefined>(ReactRouterContext);
  
  if(!context) {
    throw new ExecutionOutsideContextError();
  }

  return function(to: string | NavigateBack): void {
    if(typeof to === "string") {
      history.pushState(null, "", to);
      context.pushPath(to);
    } else if(to === -1) {
      history.back();
      context.popPath();
    }
  };
};