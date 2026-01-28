import type { UseStorageReturn, UseStorageSelector } from "./types/use-storage.type";
import type { StorageAction, StorageActionMetadata, StorageAsyncAction, StorageUnsubscribe } from "./types/create-storage.type";

import { ReactStorage } from "./components/React-Storage-Provider.component";

import { useContext, useState, useEffect } from "react";

import createAsyncAction from "./create-async-action";
import createStorage from "./create-storage";

function useStorage<S = unknown>(selector: UseStorageSelector): UseStorageReturn<S> {
  const context = useContext(ReactStorage);
  const storage = selector(context);
  const [data, dispatcher] = useState(storage.get());

  useEffect(() => {
    const unsubscribe: StorageUnsubscribe = storage.subscribe(dispatcher);

    return (): void => {
      unsubscribe();
    };
  }, []);

  function dispatch(metadata: StorageActionMetadata): void {
    if(metadata.isAsync) {
      const asyncAction: StorageAsyncAction = metadata.fn as StorageAsyncAction;
      const onPending: StorageAction = storage.actions[`${metadata.type}/pending`];
      const onRejected: StorageAction = storage.actions[`${metadata.type}/rejected`];
      const onFulfiled: StorageAction = storage.actions[`${metadata.type}/fulfiled`];

      storage.set(onPending(data, metadata.args));

      asyncAction(metadata.args)
        .then(response => {
          storage.set(onFulfiled(data, response));
        })
        .catch(reason => {
          storage.set(onRejected(data, reason));
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
};