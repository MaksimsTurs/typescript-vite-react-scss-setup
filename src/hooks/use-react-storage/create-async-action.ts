import type { AsyncAction, AsyncActionWrapper } from "./types/create-async-action.type";
import type { StorageActionMetadata } from "./types/create-storage.type";

export default function createAsyncAction<A = any, R = unknown>(name: string, action: AsyncAction<A, R>): AsyncActionWrapper<A, R> {
  function wrapper(args?: A): StorageActionMetadata<A, R> {
    return { 
      args, 
      type: name, 
      isAsync: true, 
      fn: action
    };
  };

  wrapper.pending  = `${name}/pending`  as `${string}/pending`;
  wrapper.rejected = `${name}/rejected` as `${string}/rejected`;
  wrapper.fulfiled = `${name}/fulfiled` as `${string}/fulfiled`;
  
  return wrapper;
};