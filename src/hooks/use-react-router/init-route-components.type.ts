import type { FunctionComponent } from "react";
import type { LinkProps, RouteProps } from "./use-react-router.type";

export type InitRouteComponentsReturn<P extends string> = {
  Link:  FunctionComponent<LinkProps<P>>
  Route: FunctionComponent<RouteProps<P>>
};

export type RoutePath<P extends string> = ReplaceParams<P>;

export type ReplaceParams<P extends string> = 
  // /:dynamic/static
  P extends `${infer Start}:${infer Param}/${infer Rest}` ?
    `${Start}:${Param}/${ReplaceParams<Rest>}` :
  // /:dynamic 
    P extends `${infer Start}:${infer _Param}` ?
      `${Start}${string}` :
      P;