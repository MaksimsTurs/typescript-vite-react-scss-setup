import type { Dispatch, SetStateAction } from "react";
import type { GlobalStorageActions } from "./use-global-storage.type";

export type GlobalStorages = Record<string, CreateGlobalStorageReturn<any, any>>;

export type GlobalStorage = CreateGlobalStorageReturn<any, any>;

export type CreateGlobalStorageOptions<S, A extends GlobalStorageActions<S>> = {
  actions:   A
  initState: S
};

export type CreateGlobalStorageReturn<S, A extends GlobalStorageActions<S>> = {
  subscribe: SubscribeToGlobalStorage<S>
  notify:    NotifySubscribers
  set:       SetSelectedStorageValue<S>
  get:       GetSelectedStorageValue<S>
  actions:   A
};

export type SubscribeToGlobalStorage<S = any> = (subscriber: GlobalStorageSubscriber<S>) => UnsubscribeFromGlobalStorage;

export type NotifySubscribers = () => void;

export type GlobalStorageSubscriber<S = any> = Dispatch<SetStateAction<S>>;

export type SetSelectedStorageValue<S = any> = (newState: S | SetSelectedStorageUpdate<S>) => void;

export type SetSelectedStorageUpdate<S = any> = (currValue: S) => S;

export type GetSelectedStorageValue<S = any> = () => S;

export type UnsubscribeFromGlobalStorage = () => void;
