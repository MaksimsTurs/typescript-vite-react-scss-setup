export type SafeSyncCallReturnData<R = unknown, E = unknown> = [R | null, Error | E | null];

export type SafeSyncCallCallback<R = unknown> = (...args: any[]) => R;

export type SafeSyncReturn<R = unknown, E = unknown> = SafeSyncCallReturnData<R, E>;

export type SafeSyncCallOptions<E = unknown> = {
	serializeError: (error: unknown) => E
};