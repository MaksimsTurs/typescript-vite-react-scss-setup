import type { SafeSyncCallCallback, SafeSyncReturn, SafeSyncCallOptions } from "./safe-sync-call.type";

export default function safeSyncCall<R = unknown, E = unknown>(callback: SafeSyncCallCallback<R>, options?: SafeSyncCallOptions<E>, ...args: any[]): SafeSyncReturn<R, E> {
	try {
		return [callback(...args), null];
	} catch(error) {
		const maybeSerialized: E = (options?.serializeError ? options.serializeError(error) : error) as E;

		return [null, maybeSerialized];
	}
};