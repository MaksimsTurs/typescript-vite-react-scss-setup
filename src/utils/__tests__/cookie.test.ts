import type { CookieSetOptions } from "../cookie/cookie.type";

import { expect, test, vi } from "vitest";

import cookie from "../cookie/cookie.util";
import parse from "../cookie/parse.util";

const DOM_COOKIE_NAME_VALUE  = "Musterman";
const DOM_COOKIE_TOKEN_VALUE = "c34nc3ncnücn1ünrk-cwo´$))$§oejf4";
const DOM_COOKIE             = `name=${DOM_COOKIE_NAME_VALUE}; token=${DOM_COOKIE_TOKEN_VALUE}`;

test("Parsing document cookies with values.", function() {
  vi
    .spyOn(document, "cookie", "get")
    .mockReturnValue(DOM_COOKIE);

  expect(parse())
    .toStrictEqual({ 
      name:  DOM_COOKIE_NAME_VALUE, 
      token: DOM_COOKIE_TOKEN_VALUE
    });
});

test("Parsing empty document cookies.", function() {
  vi
    .spyOn(document, "cookie", "get")
    .mockReturnValue("");

  expect(parse()).toStrictEqual({});
});

test("Getting existing document cookie field.", function() {
  vi
    .spyOn(document, "cookie", "get")
    .mockReturnValue(DOM_COOKIE);

  expect(cookie.get("name")).toEqual(DOM_COOKIE_NAME_VALUE);
});

test("Getting not existing document cookie field.", function() {
  vi
    .spyOn(document, "cookie", "get")
    .mockReturnValue(DOM_COOKIE);

  expect(cookie.get("age")).toEqual(undefined);
});

test("Setting document cookie value without options.", function() {
  vi.spyOn(document, "cookie", "set");
    
  cookie.set("name", DOM_COOKIE_NAME_VALUE, {});
  cookie.set("token", DOM_COOKIE_TOKEN_VALUE, {});

  expect(document.cookie).toEqual(DOM_COOKIE);
});

test("Setting document cookie value with options.", function() {
  vi.spyOn(document, "cookie", "set");

  const options: CookieSetOptions = { path: "/", maxAge: 2000 };
    
  cookie.set("name", DOM_COOKIE_NAME_VALUE, options);
  cookie.set("token", DOM_COOKIE_TOKEN_VALUE, options);

  expect(document.cookie).toEqual(DOM_COOKIE);
});

test("Setting document cookie value with suspicious name value.", function() {
  vi.spyOn(document, "cookie", "set");

  expect(() => cookie.set("name", "<img src=\"invalid url\"/>", {}))
    .toThrow("[Cookie]: Set value contains unsafe value!");
});

test("Setting document cookie value with suspicious path option.", function() {
  vi.spyOn(document, "cookie", "set");

  expect(() => cookie.set("name", DOM_COOKIE_NAME_VALUE, { path: "<img src=\"invalid url\"/>" }))
    .toThrow("[Cookie]: Path contains unsafe string!");
});

test("Setting document cookie value with invalid maxAge option.", function() {
  vi.spyOn(document, "cookie", "set");

  //@ts-ignore
  expect(() => cookie.set("name", DOM_COOKIE_NAME_VALUE, { maxAge: "ssus" }))
    .toThrow(`[Cookie]: options.maxAge is not of type \"number\" but type of "string"!`);
});