import { atom, useAtom, useAtomValue } from "jotai";
import type { StoreVO } from "../types";
import { splitAtom } from "jotai/utils";
import { useCallback, useEffect, useRef } from "react";
import { getMerchantStoreList } from "@services/login";
import { commonSyncStorage } from "@utils/storage";
import { StorageKeys } from "../enum.ts";

export const storesAtom = atom<StoreVO[]>([]);

export const splitStoresAtom = splitAtom(storesAtom);
export const selectStoreAtom = atom<StoreVO | null>(null);

export const storeLoadingAtom = atom<boolean>(false);

export const useStore = () => {
  const [stores, updateStores] = useAtom(storesAtom);
  const splitStores = useAtomValue(splitStoresAtom);
  const [isLock, updateLockStatus] = useAtom(storeLoadingAtom);

  const currentLoadingRef = useRef(isLock);

  const init = useCallback(async () => {
    const data = await getMerchantStoreList();
    updateStores(data.items);
  }, [updateStores]);

  useEffect(() => {
    if (!currentLoadingRef.current) {
      updateLockStatus(true);
      currentLoadingRef.current = true;
      init().finally(() => {
        updateLockStatus(false);
        currentLoadingRef.current = false;
      });
    }
  }, [init, updateLockStatus]);

  return {
    stores,
    splitStores,
    loading: isLock,
  };
};

export const useSelectedStore = () => {
  const [selectStore, updateSelectStore] = useAtom(selectStoreAtom);
  const stores = useAtomValue(storesAtom);

  const handleSelectStore = useCallback(
    async (storeId: string) => {
      console.log({ storeId });
      await commonSyncStorage.set(StorageKeys.SELECT_STORE_ID, storeId);
      updateSelectStore(stores.find((store) => storeId === store.id) ?? null);
    },
    [stores, updateSelectStore],
  );

  const initSelectedStore = useCallback(async () => {
    const selectId = await commonSyncStorage.get(StorageKeys.SELECT_STORE_ID);
    const storageStore = selectId
      ? stores.find((item) => item.id === selectId)
      : null;
    updateSelectStore(storageStore ?? stores[0] ?? null);
  }, [stores, updateSelectStore]);

  useEffect(() => {
    initSelectedStore().then(() => {});
  }, [initSelectedStore]);

  return {
    selectStore,
    toSelectStore: handleSelectStore,
  };
};
