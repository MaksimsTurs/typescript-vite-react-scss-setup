import { test, expect } from "vitest";

import { 
  countDuplicatesOfPrimitives, 
  deleteDuplicatesOfPrimitives, 
  firstLetterToUpperCase, 
  formatNumber,
  inObject
} from "../std/std.util";
import { FormatNumberUnits } from "../std/number/format-number.enum";
import fromObjectToFormData from "../std/object/from-object-to-form-data.util";

test("Count duplicates of primitives from number array.", function() {
  expect(countDuplicatesOfPrimitives([1, 2, 3, 4, 5, 5, 6], new Set([1, 2, 3, 4, 5, 6])))
    .toStrictEqual({ 
      "1": 1, 
      "2": 1, 
      "3": 1, 
      "4": 1, 
      "5": 2, 
      "6": 1 
    });
});

test("Count duplicates of primitives from string array.", function() {
  expect(countDuplicatesOfPrimitives(["first", "second", "second", "thrid"], new Set(["second"])))
    .toStrictEqual({ 
      "second": 2
    });
});

test("Delete duplicates of primitives from array.", function() {
  expect(deleteDuplicatesOfPrimitives([1, 2, 3, 4, 5, 5, 6], new Set([1, 2, 3, 4, 5, 6]))).toStrictEqual([1, 2, 3, 4, 5, 6]);
});

test("Format number, add one null.", function() {
  expect(formatNumber(10, { nullsCount: 3 }))
    .toEqual("010");
});

test("Format number, format to KB.", function() {
  expect(formatNumber(10_000, { unit: FormatNumberUnits.DATA_UNIT }))
    .toEqual("9.77KB");
});

test("Format number, format to MB.", function() {
  expect(formatNumber(100_000_000, { unit: FormatNumberUnits.DATA_UNIT }))
    .toEqual("95.37MB");
});

test("Format number, format to GB.", function() {
  expect(formatNumber(100_000_000_000, { unit: FormatNumberUnits.DATA_UNIT }))
    .toEqual("93.13GB");
});

test("Convert object to FormData.", function() {
  const res: FormData = fromObjectToFormData({
    name:          "Musterman",
    age:           20,
    nullProp:      null,
    undefinedProp: undefined
  });

  expect(res.get("name")).toEqual("Musterman");
  expect(res.get("age")).toEqual("20");
  expect(res.get("nullProp")).toEqual("null");
  expect(res.get("undefinedProp")).toEqual("undefined");
});

test("Check if object contain a property.", function() {
  expect(inObject(["name", "age"], { name: "", age: "" }))
    .toEqual(true);
});

test("Check if object doesn't contain a property.", function() {
  expect(inObject(["name", "age"], {}))
    .toEqual(false);
});

test("Convert first letter to upper case, array of strings.", function() {
  expect(firstLetterToUpperCase(["name", "age"]) as string[])
    .toStrictEqual(["Name", "Age"]);
});

test("Convert first letter to upper case, single string.", function() {
  expect(firstLetterToUpperCase("Name") as string)
    .toEqual("Name");
});