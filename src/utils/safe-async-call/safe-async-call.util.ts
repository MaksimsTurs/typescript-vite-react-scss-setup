import type { SafeAsyncCallCallback, SafeAsyncReturn, SafeAsyncCallOptions } from "./safe-async-call.type";

export default async function safeAsyncCall<R = unknown, E = unknown>(callback: SafeAsyncCallCallback<R>, options?: SafeAsyncCallOptions<E>, ...args: any[]): SafeAsyncReturn<R, E> {
	try {
		return [await callback(...args), null];
	} catch(error) {
		const maybeSerialized: E = (options?.serializeError ? options.serializeError(error) : error) as E;

		return [null, maybeSerialized];
	}
};