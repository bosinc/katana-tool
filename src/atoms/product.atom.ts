import { AliProduct, searchAliProduct } from "../services/product.ts";
import { atom, useAtom, useAtomValue } from "jotai";
import { splitAtom } from "jotai/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { clone, findIndex, insert, isEmpty, remove } from "ramda";
import { commonSyncStorage } from "../utils/storage.ts";
import { MessageActionType, StorageKeys } from "../types.ts";
import { useSnackbar } from "notistack";
import {
  DEFAULT_SNACKBAR_ANCHOR_ORIGIN,
  DEFAULT_SNACKBAR_DURATION,
} from "../utils/common.ts";

export const productListAtom = atom<AliProduct[]>([]);

export const splitProductListAtom = splitAtom(productListAtom);
export const selectedProductsAtom = atom<AliProduct[]>([]);

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
  const [selectedProducts, updateSelectedProducts] =
    useAtom(selectedProductsAtom);

  const { enqueueSnackbar } = useSnackbar();

  const { baseUrl, getImageBlob } = useBaseUrl();

  const initFetchRef = useRef(false);

  const handleSelectProduct = useCallback(
    (product: AliProduct) => {
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

  const initialProducts = useCallback(async () => {
    try {
      if (initFetchRef.current) return;
      initFetchRef.current = true;
      const imageBlob = await getImageBlob();

      if (imageBlob.size > 100 * 1000) {
        enqueueSnackbar("图片尺寸太大, 无法获取数据! 请更新图片", {
          variant: "error",
          anchorOrigin: DEFAULT_SNACKBAR_ANCHOR_ORIGIN,
          autoHideDuration: DEFAULT_SNACKBAR_DURATION,
        });
      }
      const data = await searchAliProduct(imageBlob);
      updateProducts(data.data.products);
    } finally {
      initFetchRef.current = false;
    }
  }, [enqueueSnackbar, getImageBlob, updateProducts]);

  useEffect(() => {
    if (products.length <= 0 && !isEmpty(baseUrl)) {
      initialProducts().then(() => {});
    } else {
      initFetchRef.current = false;
    }
  }, [initialProducts, baseUrl, products.length]);

  return {
    initProducts: initialProducts,
    products,
    productAtoms: splitProductList,
    updateProducts,
    selectProduct: handleSelectProduct,
    selectedProducts,
    selectedProductIds: selectedProducts.map(
      (product) => product.product.remote_id,
    ),
  };
};

export const useProductChecked = (product: AliProduct) => {
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
