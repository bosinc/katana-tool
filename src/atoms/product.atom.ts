import { searchAliProduct } from "../services/product.ts";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { splitAtom } from "jotai/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { clone, findIndex, insert, isEmpty, remove } from "ramda";
import { commonSyncStorage } from "@utils/storage.ts";
import { MessageActionType, StorageKeys } from "../types.ts";
import type { ImageSearchResponseItem } from "@katana-common/response/aliexpress.response.ts";
import useBaseSnackbar from "@hooks/useBaseSnackbar.ts";

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

  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { error } = useBaseSnackbar();

  const { baseUrl, getImageBlob } = useBaseUrl();

  const initFetchRef = useRef(false);

  const initialProducts = useCallback(async () => {
    try {
      if (initFetchRef.current) return;
      initFetchRef.current = true;
      updateSelectedProducts([]);
      setLoading(true);
      setLoadingMessage("图片处理中...");
      const imageBlob = await getImageBlob();

      if (imageBlob.size > 100 * 1000) {
        error("图片尺寸太大, 无法获取数据! 请更新图片");
      }
      setLoadingMessage("相关商品搜索中...");
      const data = await searchAliProduct(imageBlob);
      updateProducts(data.products);
    } finally {
      initFetchRef.current = false;
      setLoading(false);
      setLoadingMessage("");
    }
  }, [error, getImageBlob, updateProducts]);

  useEffect(() => {
    if (!isEmpty(baseUrl)) {
      initialProducts().then(() => {});
    }
  }, [initialProducts, baseUrl]);

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
