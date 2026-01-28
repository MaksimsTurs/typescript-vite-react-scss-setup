import type { PropsWithChildren } from "react";

import { expect, test } from "vitest";
import { renderHook } from "@testing-library/react";

import { ReactRouterContext } from "../components/Routes.component";

import usePath from "../use-path.hook";

test("test use path", function() {
  {
    const { result } = renderHook(() => usePath(), { wrapper: ({ children }: PropsWithChildren) => (
        <ReactRouterContext value={
          {
            paths: ["/", "/home"],
            patterns: new Set<string>(["/", "/home"]),
            pushPath: function(_: any): void {},
            popPath: function(): void {},
            addPattern: function(_: string): void {},
          }
        }>
          {children}
        </ReactRouterContext>
      )
    });
  
    expect(result.current).toBe("/home");
  }

  {
    const { result } = renderHook(() => usePath(), { wrapper: ({ children }: PropsWithChildren) => (
        <ReactRouterContext value={
          {
            paths: [],
            patterns: new Set<string>(["/", "/home"]),
            pushPath: function(_: any): void {},
            popPath: function(): void {},
            addPattern: function(_: string): void {},
          }
        }>
          {children}
        </ReactRouterContext>
      )
    });
  
    expect(result.current).toBe(undefined);
  }

  {
    expect(() => renderHook(() => usePath())).toThrow("You should wrapp you App into Routes component!");
  }
});