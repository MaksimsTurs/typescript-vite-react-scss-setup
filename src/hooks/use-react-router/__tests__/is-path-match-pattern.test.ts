import { test, expect } from "vitest";

import isPathMatchPattern from "../utils/is-path-match-pattern.util";

test("Test isPathMatchPattern with path that match pattern.", function() {
  expect(isPathMatchPattern("/static", "/static"))
    .toBe(true);
  expect(isPathMatchPattern("/:id", "/120"))
    .toBe(true);
  expect(isPathMatchPattern("/static/:id", "/static/120"))
    .toBe(true);
  expect(isPathMatchPattern("/:id/static", "/120/static"))
    .toBe(true);
  expect(isPathMatchPattern("/static/120", "/static/120"))
    .toBe(true);
  expect(isPathMatchPattern("/static/:user/:article", "/static/Musterman/120"))
    .toBe(true);
  expect(isPathMatchPattern("/:user/static/:article", "/Musterman/static/120"))
    .toBe(true);
  expect(isPathMatchPattern("/:user/:article/static", "/Musterman/120/static"))
    .toBe(true);
});

test("Test isPathMatchPattern with path that does not match pattern.", function() {
  expect(isPathMatchPattern("/path", "/pat"))
    .toBe(false);
  expect(isPathMatchPattern("/path/:article", "/path/Musterman/120"))
    .toBe(false);
  expect(isPathMatchPattern("/:user/:article", "/path/Musterman/120"))
    .toBe(false);
});