import { test, expect } from "vitest";

import getParamsFromPath from "../utils/get-params-from-path.util";

import PathNotMatchPatternError from "../utils/Path-Not-Match-Pattern-Error.util";

test("Test object creation of URL params from valid URL path.", function() {
  expect(getParamsFromPath("/static", "/static"))
    .toStrictEqual({});
  expect(getParamsFromPath("/static/static/static/static/static/static/static", "/static/static/static/static/static/static/static"))
    .toStrictEqual({});
  expect(getParamsFromPath("/static/:id/static/:name/static/:age/static", "/static/255905/static/Musterman/static/22/static"))
    .toStrictEqual({ id: "255905", name: "Musterman", age: "22" });
  expect(getParamsFromPath("/static/:id", "/static/120"))
    .toStrictEqual({ id: "120" });
  expect(getParamsFromPath("/static/:id/:id", "/static/120/110"))
    .toStrictEqual({ id: "110" });
  expect(getParamsFromPath("/:userId/:articleId", "/120/110"))
    .toStrictEqual({ userId: "120", articleId: "110" });
  expect(getParamsFromPath("/static/:userId/:articleId", "/static/120/110"))
    .toStrictEqual({ userId: "120", articleId: "110" });
  expect(getParamsFromPath("/:userId/static/:articleId", "/120/static/110"))
    .toStrictEqual({ userId: "120", articleId: "110" });
  expect(getParamsFromPath("/:userId/:articleId/static", "/120/110/static"))
    .toStrictEqual({ userId: "120", articleId: "110" });
  expect(getParamsFromPath("/:id1/:id2/:id3/:id4/:id5/:id6/:id7", "/1/2/3/4/5/6/7"))
    .toStrictEqual({ "id1": "1", "id2": "2", "id3": "3", "id4": "4", "id5": "5", "id6": "6", "id7": "7" });
});

test("Test error throwing because of invalid URL path.", function() {
  expect(() => getParamsFromPath("/static/:articleId/static", "/20/120/110"))
    .toThrow(PathNotMatchPatternError);
  expect(() => getParamsFromPath("/static/:articleId", "/static/120/110"))
    .toThrow(PathNotMatchPatternError);
  expect(() => getParamsFromPath("/static/:articleId/static", "/static/120/110"))
    .toThrow(PathNotMatchPatternError);
});
