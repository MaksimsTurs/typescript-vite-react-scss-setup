import type { ReactRouterContextValue } from "./use-react-router.type";

import { ReactRouterContext } from "./components/Routes.component";

import { useContext } from "react";

export default function usePath(): string {
  const context: ReactRouterContextValue<any> = useContext(ReactRouterContext)!;
  return context.path;
};