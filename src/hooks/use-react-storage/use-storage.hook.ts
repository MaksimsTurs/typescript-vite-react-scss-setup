import type { UseStorageReturn, UseStorageSelector } from "./types/use-storage.type";
import type { CreateStorageReturn, StorageAction, StorageActionMetadata, StorageUnsubscribe } from "./types/create-storage.type";
import type { AsyncAction } from "./types/create-async-action.type";
import type { ReactStorageContext } from "./types/React-Storage-Provider.type";

import { ReactStorage } from "./components/React-Storage-Provider.component";

import { useContext, useState, useEffect } from "react";

import createAsyncAction from "./create-async-action";
import createStorage from "./create-storage";

import ReactStorageProvider from "./components/React-Storage-Provider.component";

function useStorage<R = unknown, S = unknown>(selector: UseStorageSelector<S, R>): UseStorageReturn<S> {
  const context: ReactStorageContext = useContext<ReactStorageContext>(ReactStorage);
  const storage: CreateStorageReturn<S> = selector(context);
  const [data, dispatcher] = useState<S>(storage.get());

  useEffect(() => {
    const unsubscribe: StorageUnsubscribe = storage.subscribe(dispatcher);

    return (): void => {
      unsubscribe();
    };
  }, []);

  function dispatch(metadata: StorageActionMetadata): void {
    if(metadata.isAsync) {
      const asyncAction: AsyncAction = metadata.fn as AsyncAction;
      const onPending: StorageAction | undefined = storage.asyncActions[`${metadata.type}/pending`];
      const onRejected: StorageAction | undefined = storage.asyncActions[`${metadata.type}/rejected`];
      const onFulfiled: StorageAction | undefined = storage.asyncActions[`${metadata.type}/fulfiled`];

      storage.set(onPending?.(data, metadata.args));

      asyncAction(metadata.args)
        .then(response => {
          storage.set(onFulfiled?.(data, response));
        })
        .catch(reason => {
          storage.set(onRejected?.(data, reason));
        });
    } else {
      const action: StorageAction = metadata.fn as StorageAction;
      
      storage.set(action(data, metadata.args));
    }
  }

  return [data, dispatch];
};

export {
  createAsyncAction,
  createStorage,

  useStorage,

  ReactStorageProvider
};