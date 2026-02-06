import { test, expect } from "vitest";
import { render } from "@testing-library/react";

import IndexRouteIsUsedError from "../utils/Index-Route-Is-Used-Error.util";

import { initRouteComponents, Routes } from "../use-react-router.hook";

test("Check if error is throwing when defining multiple Routes as index.", function() {
  const { Route } = initRouteComponents();
  
  expect(() =>
    render(
      <Routes>
        <Route index path="/"/>
        <Route index path="/"/>
      </Routes>
    )
  ).toThrow(IndexRouteIsUsedError);
});

test("Check if children that is setted as index is rendered.", function() {
  const { Route } = initRouteComponents();
  
  const VDOM = render(
    <Routes>
      <Route index path="/" children="Home"/>
      <Route path="/about" children="About"/>
    </Routes>
  );

  expect(VDOM.getByText("Home"))
    .toBeInstanceOf(HTMLElement);
});