export type SafeAsyncCallReturnData<R = unknown, E = unknown> = [R | null, Error | E | null];

export type SafeAsyncCallCallback<R = unknown> = (...args: any[]) => Promise<R>;

export type SafeAsyncReturn<R = unknown, E = unknown> = Promise<SafeAsyncCallReturnData<R, E>>;

export type SafeAsyncCallOptions<E> = {
	serializeError: (error: unknown) => E
};