import type { ReactRouterContextValue } from "./use-react-router.type";

import { ReactRouterContext } from "./components/Routes.component";

import { useContext } from "react";

export default function usePath(): string {
  const context: ReactRouterContextValue<any> | undefined = useContext(ReactRouterContext);

  if(!context) {
    throw new Error("You should wrapp you App into Routes component!");
  }

  return context.path;
};