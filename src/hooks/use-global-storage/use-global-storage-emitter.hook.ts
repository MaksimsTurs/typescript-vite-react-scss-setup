import type { UseGlobalStorageEmitterReturn } from "./types/use-global-storage-emitter.type";
import type { GlobalStorage, GlobalStorageAction } from "./types/use-global-storage.type";
import type { CreateGlobalStorageReturn, GlobalStorages } from "./types/create-global-storage.type";
import type { KeyOf } from "@root/global.type";

import { useCallback, useContext } from "react";

import { GlobalStorageContext } from "./components/Global-Storage-Provider.component";

export default function useGlobalStorageEmitter<
  G extends GlobalStorages, 
  N extends KeyOf<G>,
>(name: N): UseGlobalStorageEmitterReturn {
  const storages: GlobalStorage<G, any> = useContext<GlobalStorage<G, any>>(GlobalStorageContext);
  const selectedStorage: CreateGlobalStorageReturn<any, any> | undefined = storages[name];

  const emit = useCallback(<N = string, P = any>(name: N, payload?: P): void => {
    const action: GlobalStorageAction<any, P> = selectedStorage.actions[name];
    const newState: any = action(selectedStorage.get(), payload);
  
    selectedStorage.set(newState);
  }, []);
  
  return emit;
};