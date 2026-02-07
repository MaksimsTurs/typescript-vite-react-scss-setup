import type { ReactStorageContext, ReactStorageProviderProps } from "../types/React-Storage-Provider.type";
import type { ReactNode, Context } from "react";

import { createContext } from "react";

export const ReactStorage: Context<ReactStorageContext<any>> = createContext<ReactStorageContext<any>>({});

export default function ReactStorageProvider({ children, storages }: ReactStorageProviderProps): ReactNode {
  return <ReactStorage value={storages}>{children}</ReactStorage>;
};