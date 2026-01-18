import { expect, test } from "vitest";

import formatUrl from "../fetcher/utils/format-url.util";
import formatInit from "../fetcher/utils/format-init.util";
import getDataFromResponse from "../fetcher/utils/get-data-from-response.util";

test("Format url with undefined base url.", function() {
  expect(formatUrl(undefined, "http://localhost:400/v1/api")).eq("http://localhost:400/v1/api");
});

test("Format url with base url.", function() {
  expect(formatUrl("http://localhost:400/v1", "/api")).eq("http://localhost:400/v1/api");
});

test("Format fetcher options, body and headers are undefined.", function() {
  expect(formatInit(undefined, undefined))
    .toStrictEqual({ 
      headers: { "Content-Type": "application/json" }, 
      body:    "{}"
    });
});

test("Format fetcher options, body (object) and headers are defined.", function() {
  expect(formatInit({ name: "Musterman", age: 20 }, { Authentification: "Bearer token" }))
    .toStrictEqual({ 
      headers: { "Content-Type": "application/json", Authentification: "Bearer token" }, 
      body:    "{\"name\":\"Musterman\",\"age\":20}"
    });
});

test("Format fetcher options, body (form data) and headers are defined.", function() {
  const formData: FormData = new FormData();

  formData.append("name", "Musterman");
  formData.append("age", "20");
  
  expect(formatInit(formData, { Authentification: "Bearer token" }))
    .toStrictEqual({ headers: { Authentification: "Bearer token" }, body: formData });
});

test("Get text data from response.", async function() {
  const headers: Headers = new Headers();

  headers.append("Content-Type", "text");

  const response: Response = new Response("Some text", { headers });

  expect(await getDataFromResponse(response)).eq("Some text");
});

test("Get json data from response.", async function() {
  const headers: Headers = new Headers();

  headers.append("Content-Type", "application/json");

  const response: Response = new Response("{\"name\":\"Musterman\",\"age\":20}", { headers });

  expect(await getDataFromResponse(response))
    .toStrictEqual({
      name: "Musterman",
      age:  20
    });
});