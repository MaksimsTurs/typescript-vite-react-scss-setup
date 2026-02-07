import type { StorageActionMetadata } from "./create-storage.type"

export type AsyncAction<A = any, R = unknown> = (arg?: A) => Promise<R>;

export type AsyncActionWrapper<A = any, R = any> = {
  (args?: A):        StorageActionMetadata<A, R>
  readonly pending:  `${string}/pending`
  readonly rejected: `${string}/rejected`
  readonly fulfiled: `${string}/fulfiled`
};