import katanaAxios from "./request.ts";
import { DEFAULT_SEARCH_PRODUCT_COUNT } from "../utils/common.ts";
import {Product} from "dto/product";

export type AliProduct = {
  product: Product;
  productDetailUrl: string;
};

export const searchAliProduct = async (
  imageBlob: Blob,
  count = DEFAULT_SEARCH_PRODUCT_COUNT,
) => {
  const formData = new FormData();
  formData.append("file", imageBlob);
  return katanaAxios.post(
    `/aliexpress/image/search?productCnt=${count}`,
    formData,
    { headers: { "Content-Type": imageBlob.type } },
  );
};

export const saveProductToShop = async (data: {
  storeId: string;
  productIds: string[];
}) => {
  return katanaAxios.post("/aliexpress/product/save", data);
};
