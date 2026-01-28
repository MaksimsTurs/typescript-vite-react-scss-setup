import { Dispatch, SetStateAction } from "react";

export type CreateStorageOptions<S = any> = {
  initState: S
  actions:   StorageActions
};

export type CreateStorageReturn = {
  actions:   StorageWrappedActions
  notify:    StorageNotify
  subscribe: StorageSubscribe
  set:       StorageSet
  get:       StorageGet
};

export type StorageSubscriber<S = any> = Dispatch<SetStateAction<S>>;

export type StorageActions = Record<string, StorageAction>;

export type StorageWrappedActions = Record<string, StorageActionWrapper>;

export type StorageAction<S = any, P = any> = (state: S, payload?: P) => S;

export type StorageActionWrapper<S = any, P = any> = (payload?: P) => StorageActionMetadata<S, P>;

export type StorageActionMetadata<S = any, P = any> = {
  args:    any
  type:    string
  isAsync: boolean
  fn:      StorageAction<S, P> | StorageAsyncAction
};

export type StorageAsyncAction<R = any, A = any> = (args?: A) => Promise<R>;

export type StorageNotify = () => void;

export type StorageSubscribe = (subscriber: StorageSubscriber<any>) => StorageUnsubscribe;

export type StorageUnsubscribe = () => void;

export type StorageSet<S = any> = (newState: StorageSetParam<S>) => S;

export type StorageGet<S = any> = () => S;

export type StorageSetParam<S = any> = ((currentState: S) => S) | S;