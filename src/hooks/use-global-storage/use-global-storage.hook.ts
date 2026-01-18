import type { KeyOf } from "@root/global.type";
import type { GlobalStorage } from "./use-global-storage.type";
import type { 
  CreateGlobalStorageReturn,
  GlobalStorages,
  UnsubscribeFromGlobalStorage
} from "./create-global-storage.type";

import { GlobalStorageContext } from "./components/Global-Storage-Provider.component";

import { useContext, useState, useEffect } from "react";

import useGlobalStorageEmitter from "./use-global-storage-emitter.hook";

import createGlobalStorage from "./create-global-storage";

import GlobalStorageProvider from "./components/Global-Storage-Provider.component";

function useGlobalStorage<G extends GlobalStorages, L>(name: KeyOf<G>): L {
  const storages: GlobalStorage<G, L> = useContext<GlobalStorage<G, L>>(GlobalStorageContext);
  const selectedStorage: CreateGlobalStorageReturn<L, any> | undefined = storages[name];

  const [data, setData] = useState<L>(selectedStorage.get());

  useEffect(() => {
    const unsubscribe: UnsubscribeFromGlobalStorage = selectedStorage.subscribe(setData);

    return () => {
      unsubscribe();
    }
  }, []);

  return data;
};

export {
  GlobalStorageProvider,
  useGlobalStorage,
  useGlobalStorageEmitter,
  createGlobalStorage
};