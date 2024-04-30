import {
  Product,
  searchAliProduct,
  // searchProducts,
} from "../services/product.ts";
import { atom, useAtom, useAtomValue } from "jotai";
import { splitAtom } from "jotai/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { clone, findIndex, insert, isEmpty, product, remove } from "ramda";
import { commonSyncStorage } from "../utils/storage.ts";
import { MessageActionType, StorageKeys } from "../types.ts";

export const productListAtom = atom<Product[]>([]);

export const splitProductListAtom = splitAtom(productListAtom);
export const selectedProductsAtom = atom<Product[]>([]);

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

  const { baseUrl, getImageBlob } = useBaseUrl();

  const initFetchRef = useRef(false);

  const handleSelectProduct = useCallback(
    (product: Product) => {
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
    [selectedProducts, product, updateSelectedProducts],
  );

  const initialProducts = useCallback(async () => {
    if (initFetchRef.current) return;
    initFetchRef.current = true;
    const imageBlob = await getImageBlob();
    const data = await searchAliProduct(imageBlob);
    console.log({ data });
    updateProducts(data.data.products);
  }, [baseUrl]);

  useEffect(() => {
    if (products.length <= 0 && !isEmpty(baseUrl)) {
      initialProducts().then(() => {
        initFetchRef.current = false;
      });
    }
  }, [initialProducts, baseUrl]);

  return {
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

export const useProductChecked = (product: Product) => {
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
