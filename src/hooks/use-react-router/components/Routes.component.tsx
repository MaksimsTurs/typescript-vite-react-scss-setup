import type { ReactRouterContextValue, RoutesProps } from "../use-react-router.type";
import type { ReactNode, RefObject } from "react";

import { createContext, useRef, useState } from "react";

export const ReactRouterContext = createContext<ReactRouterContextValue<any> | undefined>(undefined);

export default function Routes<P extends string>({ children }: RoutesProps): ReactNode {
  const [path, setPath] = useState<P>(location.pathname as P);
  const patterns: RefObject<Set<string>> = useRef<Set<string>>(new Set<string>())

  const value: ReactRouterContextValue<P> = { 
    patterns: patterns.current,
    path,
    setPath,
    addPattern: function(newPattern: string): void {
      if(!patterns.current.has(newPattern)) {
        patterns.current.add(newPattern);
      }
    },
  };
  
  return <ReactRouterContext value={value}>{children}</ReactRouterContext>
};