import type { ReactRouterContextValue } from "../types/use-react-router.type";
import type { Context, ReactNode, RefObject } from "react";
import type { RoutesProps } from "../types/Routes.type";

import { createContext, useMemo, useRef, useState } from "react";

export const ReactRouterContext: Context<ReactRouterContextValue<any> | undefined> = createContext<ReactRouterContextValue<any> | undefined>(undefined);

export default function Routes<P extends string>({ children }: RoutesProps): ReactNode {
  const [paths, setPath] = useState<P[]>([location.pathname] as P[]);
  const patterns: RefObject<Set<string>> = useRef<Set<string>>(new Set<string>())

  const value: ReactRouterContextValue<P> = useMemo(() => ({ 
    patterns: patterns.current,
    paths,
    pushPath: function(path: P): void {
      setPath(prev => [...prev, path]);
    },
    popPath: function(): void {
      setPath(prev => {
        prev.pop();
        return [...prev];
      });
    },
    addPattern: function(newPattern: string): void {
      if(!patterns.current.has(newPattern)) {
        patterns.current.add(newPattern);
      }
    },
  }), [paths]);
  
  return <ReactRouterContext value={value}>{children}</ReactRouterContext>
};