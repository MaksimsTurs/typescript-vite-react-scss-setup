import type { 
	GlobalStorageActions,
} from "./types/use-global-storage.type";
import type { 
	CreateGlobalStorageOptions,
	CreateGlobalStorageReturn,
	GlobalStorageSubscriber,
	SetSelectedStorageUpdate,
	UnsubscribeFromGlobalStorage,
} from "./types/create-global-storage.type";
import { isFunction } from "@util/is.util";

const STATES_TO_UPDATED: Set<CreateGlobalStorageReturn<any, any>> = new Set<CreateGlobalStorageReturn<any, any>>();

let REF_ID: number | null                                         = null;

function batch(): void {
	STATES_TO_UPDATED.forEach(state => state.notify());
	STATES_TO_UPDATED.clear();
	REF_ID = null;
};

function initBatch(): void {
	if(REF_ID === null) {
		REF_ID = requestAnimationFrame(batch);
	}
};

function addState(state: CreateGlobalStorageReturn<any, any>): void {
	if(!STATES_TO_UPDATED.has(state)) {
		STATES_TO_UPDATED.add(state);
	}
};

export default function createGlobalStorage<
	// State
	S,
	// User defined actions
	A extends GlobalStorageActions<S>
>(options: CreateGlobalStorageOptions<S, A>): CreateGlobalStorageReturn<S, A> {
	const subscribers: GlobalStorageSubscriber<S>[] = [];

	let state: S = options.initState;

	return {
		actions: options.actions,
		notify: function(): void {
			for(let index: number = 0; index < subscribers.length; index++) {
				const subscriber: GlobalStorageSubscriber<S> = subscribers[index];

				subscriber(state);
			}
		},
		subscribe: function(subscriber: GlobalStorageSubscriber): UnsubscribeFromGlobalStorage {
			const index: number = subscribers.push(subscriber) - 1;

			return () => {
				subscribers.splice(index);
			};
		},
		set: function(newState: S | SetSelectedStorageUpdate<S>): void {
			initBatch();
			addState(this);

			if(newState !== state) {
				if(isFunction(newState)) {
					state = (newState as SetSelectedStorageUpdate<S>)(state);
				} else {
					state = newState as S;
				}
			}
		},
		get: function(): S {
			return state;
		},
	};
};