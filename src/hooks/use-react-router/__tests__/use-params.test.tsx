import type { PropsWithChildren } from "react";

import { expect, test } from "vitest";
import { renderHook } from "@testing-library/react";

import { ReactRouterContext } from "../components/Routes.component";

import useParams from "../use-params.hook";

test("test use params", function() {
  {
    const { result } = renderHook(() => useParams(), { wrapper: ({ children }: PropsWithChildren) => (
        <ReactRouterContext value={
          {
            paths: ["/", "/250"],
            patterns: new Set<string>(["/", "/:id"]),
            pushPath: function(_: any): void {},
            popPath: function(): void {},
            addPattern: function(_: string): void {},
          }
        }>
          {children}
        </ReactRouterContext>
      )
    });
  
    expect(result.current).toStrictEqual({ id: "250" });
  }

  {
    const { result } = renderHook(() => useParams(), { wrapper: ({ children }: PropsWithChildren) => (
        <ReactRouterContext value={
          {
            paths: ["/"],
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
  
    expect(result.current).toStrictEqual({});
  }

  {
    expect(() => renderHook(() => useParams())).toThrow("You should wrapp you App into Routes component!");
  }
});