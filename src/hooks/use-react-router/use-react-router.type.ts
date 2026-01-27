import type { PropsWithChildren, ReactNode, JSX } from "react";

export type ReactRouterContextValue<P extends string> = {
  paths:      P[]
  patterns:   Set<string>
  pushPath:   ReactRouterPushPath<P>
  popPath:    ReactRouterPopPath
  addPattern: ReactRouterAddPathPattern;
};

type ReactRouterAddPathPattern = (pattern: string) => void;

type ReactRouterPushPath<P extends string> = (path: P) => void;

type ReactRouterPopPath = () => void;

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