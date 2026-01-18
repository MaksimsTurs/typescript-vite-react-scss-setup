import { expect, test } from "vitest";

import safeAsyncCall from "../safe-async-call/safe-async-call.util";

test("Safe async call, return value.", async function() {
  const res = await safeAsyncCall(async () => 5);

  expect(res).toStrictEqual([5, null]);
});

test("Safe async call, error.", async function() {
  const res = await safeAsyncCall(async () => {
    throw new Error("Test");
  });

  expect(res).toStrictEqual([null, new Error("Test")]);
});

test("Safe async call with error serialization.", async function() {
  const res = await safeAsyncCall<never, { text: string }>(async () => {
    throw new Error("Test");
  }, { serializeError: (error) => ({ text: (error as Error).message })});

  expect(res).toStrictEqual([null, { text: "Test" }]);
});