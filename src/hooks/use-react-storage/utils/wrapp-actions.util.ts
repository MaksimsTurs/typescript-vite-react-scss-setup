import type { StorageActions, StorageWrappedActions } from "../types/create-storage.type";

export default function wrappActions<S>(actions?: StorageActions<S>): StorageWrappedActions<S> {
  const wrapped: StorageWrappedActions<S> = {};

  for(let name in actions) {
    wrapped[name] = function(args?: any) {
      return { 
        args, 
        type:    name, 
        isAsync: false,
        fn:      actions[name] 
      };
    }
	}

  return wrapped;
};