import { FetcherHeaderKeys } from "./fetcher.enum";

export type Fethcer = {
  base?: string
  get:   FetcherGet
  post:  FetcherPost
};

export type FetcherGet = <R = unknown>(url: string, options?: FetcherOptions) => Promise<R>;

export type FetcherPost = <R = unknown>(url: string, body?: any, options?: FetcherOptions) => Promise<R>;

export type FetcherHeaders = Partial<Record<FetcherHeaderKeys, string>>;

export type FormatedInit = {
	body: any | null
	headers: FetcherHeaders | null
};

export type FetcherOptions = {
	headers?: FetcherHeaders
} & Omit<RequestInit, "method" | "body" | "headers">;