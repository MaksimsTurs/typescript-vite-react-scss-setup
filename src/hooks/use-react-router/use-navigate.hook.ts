import type { ReactRouterContextValue } from "./use-react-router.type";

import { useContext } from "react";

import { ReactRouterContext } from "./components/Routes.component";

export default function useNavigate(): (to: string | -1) => void {
  const context: ReactRouterContextValue<any> | undefined = useContext(ReactRouterContext);
  
  if(!context) {
    throw new Error("You should wrapp you App into Routes component!");
  }

  return function(to: string | -1): void {
    if(typeof to === "string") {
      history.pushState(null, "", to);
      context.pushPath(to);
    } else if(to === -1) {
      history.back();
      context.popPath();
    }
  }
};