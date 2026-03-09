import { test, expect } from "vitest";

import scall from "../scall/scall.util";

import SCallResult from "../scall/SCall-Result.util";

test("Test scall with sync callback that return simple value.", function() {
  const res = scall(() => 2 + 2);

  expect(res)
    .toBeInstanceOf(SCallResult);
  expect(res.getData())
    .toBe(4);
  expect(res.getError())
    .toBe(undefined);
});

test("Test scall with sync callback that throw a error.", function() {
  const res = scall(() => {
    throw new Error("error") 
  });

  expect(res)
    .toBeInstanceOf(SCallResult);
  expect(res.getData())
    .toBe(undefined);
  expect(res.getError())
    .toBeInstanceOf(Error);
});

test("Test scall with sync callback that return another scall result without throwing a error.", function() {
  const res = scall(() => {
    return scall(() => 2 + 4)
  });

  expect(res)
    .toBeInstanceOf(SCallResult);
  expect(res.getData())
    .toBe(6);
  expect(res.getError())
    .toBe(undefined);
});

test("Test scall with sync callback that return another scall result without throwing a error.", function() {
  const res = scall(() => {
    return scall(() => {
      throw new Error("error");
    })
  });

  expect(res)
    .toBeInstanceOf(SCallResult);
  expect(res.getData())
    .toBe(undefined);
  expect(res.getError())
    .toBeInstanceOf(Error);
});

test("Test scall with async callback that return simple value.", async function() {
  const res = await scall<number>(async() => {
    return 12;
  });

  expect(res)
    .toBeInstanceOf(SCallResult);
  expect(res.getData())
    .toBe(12);
  expect(res.getError())
    .toBe(undefined);
});

test("Test scall with async callback that throw a error.", async function() {
  const res = await scall<never>(async() => {
    throw new Error("error")
  });

  expect(res)
    .toBeInstanceOf(SCallResult);
  expect(res.getData())
    .toBe(undefined);
  expect(res.getError())
    .toBeInstanceOf(Error);
});

test("Test scall with async callback that return another scall result without throwing a error.", async function() {
  const res = await scall<number>(async() => {
    return scall<number>(async () => 6)
  });

  expect(res)
    .toBeInstanceOf(SCallResult);
  expect(res.getData())
    .toBe(6);
  expect(res.getError())
    .toBe(undefined);
});

test("Test scall with async callback that return another scall result without throwing a error.", async function() {
  const res = await scall<never>(async() => {
    return await scall<never>(async() => {
      throw new Error("error");
    })
  });

  expect(res)
    .toBeInstanceOf(SCallResult);
  expect(res.getData())
    .toBe(undefined);
  expect(res.getError())
    .toBeInstanceOf(Error);
});
