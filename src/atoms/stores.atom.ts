import { atom, useAtom, useAtomValue } from "jotai";
import type { StoreVO } from "../types";
import { splitAtom } from "jotai/utils";
import { useCallback, useEffect } from "react";
import { getMerchantStoreList } from "@services/login";
import { commonSyncStorage } from "@utils/storage";
import { StorageKeys } from "../enum.ts";
import { useRequest } from "ahooks";

export const storesAtom = atom<StoreVO[]>([]);

export const splitStoresAtom = splitAtom(storesAtom);

export const selectStoreAtom = atom<StoreVO | null>(null);

export const useStore = () => {
  const [stores, updateStores] = useAtom(storesAtom);

  const splitStores = useAtomValue(splitStoresAtom);
  const [selectStore, updateSelectStore] = useAtom(selectStoreAtom);

  const { data, loading } = useRequest(getMerchantStoreList, { manual: false });

  const initSelectedStore = useCallback(async () => {
    const selectId = await commonSyncStorage.get(StorageKeys.SELECT_STORE_ID);
    const storageStore = selectId
      ? stores.find((item) => item.id === selectId)
      : null;
    updateSelectStore(storageStore ?? stores[0] ?? null);
  }, [stores, updateSelectStore]);

  useEffect(() => {
    if (data) {
      updateStores(data.items);
      initSelectedStore().then(() => {});
    }
  }, [data, initSelectedStore, selectStore, updateStores]);

  const handleSelectStore = useCallback(
    async (storeId: string) => {
      console.log({ storeId });
      await commonSyncStorage.set(StorageKeys.SELECT_STORE_ID, storeId);
      updateSelectStore(stores.find((store) => storeId === store.id) ?? null);
    },
    [stores, updateSelectStore],
  );

  return {
    stores,
    splitStores,
    selectStore,
    toSelectStore: handleSelectStore,
    loading,
  };
};
