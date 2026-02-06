import type { PropsWithChildren } from "react";

import { expect, test } from "vitest";
import { renderHook } from "@testing-library/react";

import { ReactRouterContext } from "../components/Routes.component";

import usePath from "../use-path.hook";

import ExecutionOutsideContext from "../utils/Execution-Outside-Context-Error.util";

test("Test the usePath hook with valid paths.", function() {
  const { result } = renderHook(() => usePath(), { wrapper: ({ children }: PropsWithChildren) => (
      <ReactRouterContext value={
        {
          paths: ["/"],
          patterns: new Set<string>(["/", "/user/:userId/article/:articleId"]),
          pushPath: function(_: any): void {},
          popPath: function(): void {},
          addPattern: function(_: string): void {},
          asIndex: function(_): void {}        }
      }>
        {children}
      </ReactRouterContext>
    )
  });

  expect(result.current).toBe("/");
});

test("Test the usePath hook without valid paths.", function() {
  const { result } = renderHook(() => usePath(), { wrapper: ({ children }: PropsWithChildren) => (
      <ReactRouterContext value={
        {
          paths: [],
          patterns: new Set<string>(["/", "/home"]),
          pushPath: function(_: any): void {},
          popPath: function(): void {},
          addPattern: function(_: string): void {},
          asIndex: function(_): void {}
        }
      }>
        {children}
      </ReactRouterContext>
    )
  });

  expect(result.current).toBe(undefined);
});

test("Test the usePath hook that was called outside the contexts.", function() {
  expect(() => renderHook(() => usePath()))
    .toThrow(ExecutionOutsideContext);
});