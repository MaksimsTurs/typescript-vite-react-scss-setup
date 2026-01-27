import type { PropsWithChildren } from "react";
import type { CreateGlobalStorageReturn, GlobalStorages } from "./create-global-storage.type";
import type { KeyOf } from "@root/global.type";

export type GlobalStorageNames<G extends GlobalStorages> = KeyOf<G>;

export type GlobalStorageActionNames<
  G extends GlobalStorages, 
  N extends GlobalStorageNames<G>
> = KeyOf<G[N]["actions"]>;

export type GlobalStorageProps = PropsWithChildren<{
  storages: Record<string, CreateGlobalStorageReturn<any, any>>
}>;

export type GlobalStorageAction<S = any, P = any> = (state: S, payload?: P) => S;

export type GlobalStorageActions<S> = Record<string, GlobalStorageAction<S, any>>

export type GlobalStorage<G, L> = Record<KeyOf<G>, CreateGlobalStorageReturn<L, any>>;