import type { Fethcer, FormatedInit, FetcherOptions } from "./types/fetcher.type";

import formatUrl from "./utils/format-url.util";
import formatInit from "./utils/format-init.util";
import getDataFromResponse from "./utils/get-data-from-response.util";

const fetcher: Fethcer = {
  base: undefined,
  get: async function<R>(url: string, options?: FetcherOptions): Promise<R> {
		const initData: FormatedInit = formatInit(undefined, options?.headers);
		const response: Response = await fetch(formatUrl(this.base, url), {
			...options,
			method: "GET",
			headers: initData.headers as HeadersInit
		});

		if(!response.ok) {
			throw await response.json();
		}

		return getDataFromResponse<R>(response);
	},
  post: async function<R>(url: string, body?: any, options?: FetcherOptions): Promise<R> {
		const initData: FormatedInit = formatInit(body, options?.headers);
		const response: Response = await fetch(formatUrl(this.base, url), {
			...options,
			method: "POST",
			body: initData.body,
			headers: initData.headers as HeadersInit
		});

		if(!response.ok) {
			throw await response.json();
		}

		return getDataFromResponse<R>(response);
	}
};

export default fetcher;