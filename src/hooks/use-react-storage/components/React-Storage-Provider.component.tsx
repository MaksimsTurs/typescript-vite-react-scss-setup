import { createContext, ReactNode } from "react";

export const ReactStorage = createContext<any>({});

export default function ReactStorageProvider({ children, storages }: any): ReactNode {
  return <ReactStorage value={storages}>{children}</ReactStorage>;
};