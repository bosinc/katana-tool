import { searchAliProduct } from "../services/product.ts";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { splitAtom } from "jotai/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { clone, findIndex, insert, isEmpty, remove } from "ramda";
import { commonSyncStorage } from "@utils/storage.ts";
import { MessageActionType, StorageKeys } from "../enum.ts";
import useBaseSnackbar from "@hooks/useBaseSnackbar.ts";
import type { ImageSearchResponseItem } from "response/aliexpress.response";
import { useRequest } from "ahooks";

export const productListAtom = atom<ImageSearchResponseItem[]>([]);

export const splitProductListAtom = splitAtom(productListAtom);
export const selectedProductsAtom = atom<ImageSearchResponseItem[]>([]);

export const useBaseUrl = () => {
  const [baseUrl, setBaseUrl] = useState("");

  const getImageBlob = useCallback(async () => {
    const res = await fetch(baseUrl);
    return await res.blob();
  }, [baseUrl]);

  useEffect(() => {
    if (chrome.storage) {
      commonSyncStorage.get(StorageKeys.BASE_URL).then((value) => {
        setBaseUrl(value ?? "");
      });
      chrome.runtime.onMessage.addListener(function (message) {
        if (message.action === MessageActionType.IMAGE_ACTION) {
          setBaseUrl(message.data);
        }
      });
    }
  }, []);

  return { baseUrl, getImageBlob };
};

export const useProduct = () => {
  const [products, updateProducts] = useAtom(productListAtom);
  const splitProductList = useAtomValue(splitProductListAtom);
  const updateSelectedProducts = useSetAtom(selectedProductsAtom);

  const { baseUrl, getImageBlob } = useBaseUrl();

  const [loadingMessage, setLoadingMessage] = useState<string>("");

  const { error } = useBaseSnackbar();

  const initialProducts = useCallback(async () => {
    try {
      updateSelectedProducts([]);
      setLoadingMessage("图片处理中...");
      const imageBlob = await getImageBlob();

      if (imageBlob.size > 100 * 1000) {
        error("图片大于100KB, 无法获取数据! 请重新选择图片");
        return false;
      }
      setLoadingMessage("相关商品搜索中...");
      return await searchAliProduct(imageBlob);
    } finally {
      setLoadingMessage("");
    }
  }, [error, getImageBlob, updateProducts, updateSelectedProducts]);

  const { loading, run, data, cancel } = useRequest(initialProducts, {
    manual: true,
  });

  useEffect(() => {
    if (!isEmpty(baseUrl)) {
      cancel();
      run();
    }
  }, [initialProducts, baseUrl]);

  useEffect(() => {
    if (data) {
      updateProducts(data.products);
    }
  }, [data]);

  return {
    initProducts: initialProducts,
    products,
    productAtoms: splitProductList,
    updateProducts,
    loading,
    loadingMessage,
  };
};

export const useSelectProduct = () => {
  const [selectedProducts, updateSelectedProducts] =
    useAtom(selectedProductsAtom);

  const selectedProductIds = useMemo(
    () =>
      selectedProducts
        .map((product) => product.product.remote_id)
        .filter((item) => item !== null) as string[],
    [selectedProducts],
  );

  const handleSelectProduct = useCallback(
    (product: ImageSearchResponseItem) => {
      const cloneSelectedProducts = clone(selectedProducts);
      const findProductIndex = findIndex(
        (selectedProduct) =>
          selectedProduct.product.remote_id === product.product.remote_id,
        cloneSelectedProducts,
      );
      if (findProductIndex >= 0) {
        const updateList = remove(findProductIndex, 1, cloneSelectedProducts);
        updateSelectedProducts(updateList);
      } else {
        const updateList = insert(-1, product, cloneSelectedProducts);
        updateSelectedProducts(updateList);
      }
    },
    [selectedProducts, updateSelectedProducts],
  );

  return {
    selectedProducts,
    selectedProductIds,
    selectProduct: handleSelectProduct,
  };
};

export const useProductChecked = (product: ImageSearchResponseItem) => {
  const selectedProducts = useAtomValue(selectedProductsAtom);
  return useMemo(() => {
    const findProductIndex = findIndex(
      (selectedProduct) =>
        selectedProduct.product.remote_id === product.product.remote_id,
      selectedProducts,
    );
    return findProductIndex >= 0;
  }, [selectedProducts, product]);
};
