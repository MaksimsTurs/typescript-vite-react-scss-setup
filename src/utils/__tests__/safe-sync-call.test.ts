import { expect, test } from "vitest";

import safeSyncCall from "../safe-sync-call/safe-sync-call.util";

test("Safe sync call, return value.",  function() {
  const res = safeSyncCall( () => 5);

  expect(res).toStrictEqual([5, null]);
});

test("Safe sync call, error.",  function() {
  const res = safeSyncCall( () => {
    throw new Error("Test");
  });

  expect(res).toStrictEqual([null, new Error("Test")]);
});

test("Safe sync call with error serialization.",  function() {
  const res = safeSyncCall<never, { text: string }>( () => {
    throw new Error("Test");
  }, { serializeError: (error) => ({ text: (error as Error).message })});

  expect(res).toStrictEqual([null, { text: "Test" }]);
});