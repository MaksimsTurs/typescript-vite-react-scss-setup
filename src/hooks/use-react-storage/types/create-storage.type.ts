import type { Dispatch, SetStateAction } from "react";
import type { AsyncActionWrapper } from "./create-async-action.type";

export type CreateStorageOptions<S, A> = {
  initState:     S
  actions?:      A
  asyncActions?: StorageAsyncActions<S>
};

export type StorageAsyncActions<S> = Record<`${string}/${"pending" | "rejected" | "fulfiled"}`, StorageAction<S> | undefined>;

export type StorageActions<S> = {
  [key: string]: StorageAction<S>
};

export type StorageWrappedActions<S> = {
  [key: string]: StorageActionWrapper<S>
};

export type StorageAction<S = any> = (state: S, payload?: any) => S;

export type StorageActionWrapper<R> = (args?: any) => StorageActionMetadata<R>;

export type StorageActionMetadata<A = any, R = any> = {
  args?:   A
  type:    string
  isAsync: boolean
  fn:      StorageAction | AsyncActionWrapper<A, R>
};

export type CreateStorageReturn<S> = {
  actions:       StorageWrappedActions<S>
  asyncActions?: StorageAsyncActions<S>
  notify:        StorageNotify
  subscribe:     StorageSubscribe
  set:           StorageSet
  get:           StorageGet
};

export type StorageSubscriber<S = any> = Dispatch<SetStateAction<S>>;

export type StorageNotify = () => void;

export type StorageSubscribe = (subscriber: StorageSubscriber<any>) => StorageUnsubscribe;

export type StorageUnsubscribe = () => void;

export type StorageSet<S = any> = (newState: StorageSetParam<S>) => S;

export type StorageGet<S = any> = () => S;

export type StorageSetParam<S = any> = ((currentState: S) => S) | S;