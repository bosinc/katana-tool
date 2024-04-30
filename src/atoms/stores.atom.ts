import { atom, useAtom, useAtomValue } from "jotai";
import { StorageKeys, StoreVO } from "../types.ts";
import { splitAtom } from "jotai/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { getMerchantStoreList } from "../services/login";
import { commonSyncStorage } from "../utils/storage";

export const storesAtom = atom<StoreVO[]>([]);

export const splitStoresAtom = splitAtom(storesAtom);

export const selectStoreAtom = atom<StoreVO | null>(null);

export const useStore = () => {
  const [stores, updateStores] = useAtom(storesAtom);

  const splitStores = useAtomValue(splitStoresAtom);
  const [selectStore, updateSelectStore] = useAtom(selectStoreAtom);

  const initStatusRef = useRef(false);
  const [loading, setLoading] = useState(false);

  const initStores = useCallback(async () => {
    if (initStatusRef.current) return;
    setLoading(true);
    initStatusRef.current = true;
    const { items } = await getMerchantStoreList();
    updateStores(items);
    if (!selectStore) {
      const selectId = await commonSyncStorage.get(StorageKeys.SELECT_STORE_ID);
      const storageStore = selectId
        ? items.find((item) => item.id === selectId)
        : null;
      updateSelectStore(storageStore ?? items[0] ?? null);
    }
  }, [updateStores, updateSelectStore, setLoading, selectStore]);

  const handleSelectStore = useCallback(
    async (storeId: string) => {
      await commonSyncStorage.set(StorageKeys.SELECT_STORE_ID, storeId);
      updateSelectStore(stores.find((store) => storeId === store.id) ?? null);
    },
    [stores, updateSelectStore],
  );

  useEffect(() => {
    if (stores.length <= 0) {
      initStores().then(() => {});
    } else {
      setLoading(false);
      initStatusRef.current = false;
    }
  }, [stores, initStores, setLoading]);

  return {
    stores,
    splitStores,
    selectStore,
    toSelectStore: handleSelectStore,
    loading,
  };
};
