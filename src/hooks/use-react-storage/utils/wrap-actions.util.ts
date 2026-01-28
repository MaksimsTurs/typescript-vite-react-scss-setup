import type { StorageActions, StorageWrappedActions } from "../types/create-storage.type";

export default function wrapActions(actions: StorageActions): StorageWrappedActions {
	const wrapped: StorageWrappedActions = {};
  const asyncPattern: RegExp = /pending|rejected|fulfiled/;

  for(let name in actions) {
    asyncPattern.lastIndex = 0;
    
    if(asyncPattern.test(name)) {
      wrapped[name] = actions[name];
    } else {
      wrapped[name] = function(args: any) {
        return { 
          args, 
          type:    name, 
          isAsync: false,
          fn:      actions[name] 
        };
      }
    }
	}

  return wrapped;
};