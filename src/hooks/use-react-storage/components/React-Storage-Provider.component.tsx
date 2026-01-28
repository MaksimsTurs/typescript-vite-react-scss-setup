import type { ReactStorageContext } from "../types/React-Storage-Provider.type";

import { createContext, ReactNode } from "react";

export const ReactStorage = createContext<ReactStorageContext>({});

export default function ReactStorageProvider({ children, storages }: any): ReactNode {
  return <ReactStorage value={storages}>{children}</ReactStorage>;
};