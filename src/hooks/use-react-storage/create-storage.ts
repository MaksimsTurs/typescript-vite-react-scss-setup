import type { 
	CreateStorageOptions, 
	CreateStorageReturn, 
	StorageActions, 
	StorageSetParam, 
	StorageSubscriber, 
	StorageUnsubscribe, 
	StorageWrappedActions
} from "./types/create-storage.type";

import { isFunction } from "@util/is.util";
import wrapActions from "./utils/wrapp-actions.util";

export default function createStorage<
  S,
  A extends StorageActions<S>
>(options: CreateStorageOptions<S, A>): CreateStorageReturn<S> {
	const subscribers: StorageSubscriber[] = [];
	const actions: StorageWrappedActions<S> = wrapActions<S>(options.actions);

	let state: S = options.initState;

	return Object.defineProperties<any>({}, {
		actions: {
			value: actions
		},
		asyncActions: {
			value: options.asyncActions
		},
		notify: {
			value: function(): void {
				for(let index: number = 0; index < subscribers.length; index++) {
					const subscriber: StorageSubscriber = subscribers[index];
					subscriber(state);
				}
			}
		},
		subscribe: {
			value: function(subscriber: StorageSubscriber): StorageUnsubscribe {
				const index: number = subscribers.push(subscriber) - 1;

				return (): void => {
					subscribers.splice(index, 1);
				};
			}
		},
		set: {
			value: function(newState: StorageSetParam): void {
				if(newState !== state) {
					if(isFunction(newState)) {
						//@ts-ignore
						state = newState(state);
					} else {
						state = newState;
					}
				}
				this.notify();
			}
		},
		get: {
			value: function(): S {
				return state;
			},
		}
	});
};