import type { CreateStorageReturn, StorageActionMetadata } from "./create-storage.type";

export type UseStorageReturn<S = unknown> = [
  S,
  UseStorageDispatcher
];

export type UseStorageSelector = (storages: Record<string, CreateStorageReturn>) => CreateStorageReturn;

type UseStorageDispatcher = (action: StorageActionMetadata) => void;