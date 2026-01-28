import { FetcherHeaders, FormatedInit } from "../fetcher.type";

import { isObject, isInstanceOf, isPrimitive } from "@util/is.util";

export default function formatInit(body?: any, headers?: FetcherHeaders): FormatedInit {
	if(headers && !isObject(headers)) {
		throw new TypeError(`[Fetcher]: Headers is not of type "object" but type of "${typeof headers}"!`);
	}	

	headers = headers ? headers : {};

	if(body && !isInstanceOf(body, FormData) && !isPrimitive(body)) {
		headers["Content-Type"] = "application/json";
		body = JSON.stringify(body);
	}

	return { headers, body };
};