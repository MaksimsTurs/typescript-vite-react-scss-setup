import type { MouseEvent, ReactNode } from "react";
import type { LinkProps, ReactRouterContextValue } from "../use-react-router.type";

import { ReactRouterContext } from "./Routes.component";

import { useContext } from "react";

export default function Link<P extends string>({ children, ...attributes }: LinkProps<P>): ReactNode {
  const context: ReactRouterContextValue<any> | undefined = useContext(ReactRouterContext);

  const changePath = (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();

    history.pushState(null, "", attributes.href);
    context?.setPath(attributes.href);
  };

  return <a {...attributes} onClick={changePath}>{children}</a>;
};