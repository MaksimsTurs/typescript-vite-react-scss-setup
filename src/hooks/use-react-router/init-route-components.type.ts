import type { FunctionComponent } from "react";
import type { LinkProps } from "./types/Link.type";
import type { RouteProps } from "./types/Route.type";

export type InitRouteComponentsReturn<P extends string> = {
  Link:  FunctionComponent<LinkProps<P>>
  Route: FunctionComponent<RouteProps<P>>
};