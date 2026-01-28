import type { StorageActionMetadata } from "./create-storage.type"

export type CreateAsyncActionReturn<A = any> = {
  (args?: A):        StorageActionMetadata
  readonly type:     string
  readonly isAsync:  boolean
  readonly pending:  string
  readonly rejected: string
  readonly fulfiled: string
};