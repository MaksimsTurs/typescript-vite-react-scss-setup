import type { PropsWithChildren } from "react";
import type { CreateStorageReturn } from "./create-storage.type";

export type ReactStorageContext<S = any> = {
  [key in keyof S]: CreateStorageReturn<any>
};

export type ReactStorageProviderProps = PropsWithChildren<{
  storages: ReactStorageContext<any>
}>