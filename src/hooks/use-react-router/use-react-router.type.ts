import type { Dispatch, PropsWithChildren, ReactNode, SetStateAction, JSX } from "react";

export type ReactRouterContextValue<P extends string> = {
  path:    P
  patterns: Set<string>
  setPath: ReactRouterContextSetPath<P>
  addPattern: (newPattern: string) => void;
};

export type AddPattern = (pattern: string) => void;

export type ReactRouterContextSetPath<P extends string> = Dispatch<SetStateAction<P>>;

export type RoutesProps = PropsWithChildren;

export type RouteProps<P extends string> = PropsWithChildren<{
  path:      P
  protect?:  boolean
  /** Must be used with `Route.protect` argument. The `Route.fallback` component will be rendered when the protect condition true is. */
  fallback?: ReactNode
}>;

export type LinkProps<P extends string> = PropsWithChildren<{
  href: P
} & JSX.IntrinsicElements["a"]>