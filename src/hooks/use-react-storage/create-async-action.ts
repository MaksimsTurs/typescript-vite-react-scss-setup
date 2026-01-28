import type { CreateAsyncActionReturn } from "./types/create-async-action.type";
import type { StorageActionMetadata, StorageAsyncAction } from "./types/create-storage.type";

export default function createAsyncAction<R = unknown, A = unknown>(name: string, action: StorageAsyncAction<R, A>): CreateAsyncActionReturn {
  function asyncAction(args?: A): StorageActionMetadata {
    return { args, type: name, isAsync: true, fn: action };
  };

  asyncAction.type = name;
  asyncAction.isAsync = true;

  asyncAction.pending = `${name}/pending`;
  asyncAction.rejected = `${name}/rejected`;
  asyncAction.fulfiled = `${name}/fulfiled`;
  
  return asyncAction;
};