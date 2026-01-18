import type { GlobalStorage, GlobalStorageProps } from "../use-global-storage.type";

import { createContext, ReactNode } from "react";

export const GlobalStorageContext = createContext<GlobalStorage<any, any>>({});

export default function GlobalStorageProvider({ children, storages }: GlobalStorageProps): ReactNode {
  return <GlobalStorageContext value={storages}>{children}</GlobalStorageContext>;
};