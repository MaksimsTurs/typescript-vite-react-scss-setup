export type ReactRouterContextValue<P extends string> = {
  paths:      P[]
  patterns:   Set<string>
  pushPath:   ReactRouterPushPath<P>
  popPath:    ReactRouterPopPath
  addPattern: ReactRouterAddPathPattern;
  asIndex:    ReactRouterAsIndex<P>
};

type ReactRouterAsIndex<P> = (path: P) => void;

type ReactRouterAddPathPattern = (pattern: string) => void;

type ReactRouterPushPath<P extends string> = (path: P) => void;

type ReactRouterPopPath = () => void;