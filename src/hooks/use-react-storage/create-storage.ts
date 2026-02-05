import type { 
	CreateStorageOptions, 
	CreateStorageReturn, 
	StorageSetParam, 
	StorageSubscriber, 
	StorageUnsubscribe, 
	StorageWrappedActions
} from "./types/create-storage.type";

import { isFunction } from "@util/is.util";
import wrapActions from "./utils/wrap-actions.util";

export default function createStorage<
	S = any,
>(options: CreateStorageOptions<S>): CreateStorageReturn {
	const subscribers: StorageSubscriber[] = [];
	const actions: StorageWrappedActions = wrapActions(options.actions);

	let state = options.initState;

	return {
		actions,
		notify: function(): void {
			for(let index: number = 0; index < subscribers.length; index++) {
				const subscriber: StorageSubscriber = subscribers[index];
				subscriber(state);
			}
		},
		subscribe: function(subscriber: StorageSubscriber): StorageUnsubscribe {
			const index: number = subscribers.push(subscriber) - 1;

			return (): void => {
				subscribers.splice(index, 1);
			};
		},
		set: function(newState: StorageSetParam): void {
			if(newState !== state) {
				if(isFunction(newState)) {
					//@ts-ignore
					state = newState(state);
				} else {
					state = newState;
				}
			}
			this.notify();
		},
		get: function(): S {
			return state;
		},
	};
};