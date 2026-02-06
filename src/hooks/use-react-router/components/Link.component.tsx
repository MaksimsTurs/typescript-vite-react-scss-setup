import type { MouseEvent, ReactNode } from "react";
import type { ReactRouterContextValue } from "../types/use-react-router.type";
import type { LinkProps } from "../types/Link.type";

import { ReactRouterContext } from "./Routes.component";

import { useContext } from "react";

import ExecutionOutsideContext from "../utils/Error-Outside-Context.util";

export default function Link<P extends string>({ children, ...attributes }: LinkProps<P>): ReactNode {
  const context: ReactRouterContextValue<any> | undefined = useContext(ReactRouterContext);

  if(!context) {
    throw new ExecutionOutsideContext();
  }

  const changePath = (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();

    history.pushState(null, "", attributes.href);
    context.pushPath(attributes.href);
  };

  return <a {...attributes} onClick={changePath}>{children}</a>;
};