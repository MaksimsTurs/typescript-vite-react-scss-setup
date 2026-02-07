import type { CreateStorageReturn, StorageActionMetadata } from "./create-storage.type";
import { ReactStorageContext } from "./React-Storage-Provider.type";

export type UseStorageReturn<S = unknown> = [
  S,
  UseStorageDispatcher
];

export type UseStorageSelector<S, R> = (storages: ReactStorageContext<R>) => CreateStorageReturn<S>;

type UseStorageDispatcher = (action: StorageActionMetadata<any, any>) => void;