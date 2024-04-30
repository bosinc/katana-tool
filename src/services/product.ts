import data from "./data.json";
import katanaAxios from "./request.ts";
import { DEFAULT_SEARCH_PRODUCT_COUNT } from "../utils/common.ts";

export type Product = (typeof data.data.products)[0];

export const searchProducts = async () => {
  return data;
};

export const searchAliProduct = async (
  imageBlob: Blob,
  count = DEFAULT_SEARCH_PRODUCT_COUNT,
) => {
  return katanaAxios.post(
    `/aliexpress/image/search?productCnt=${count}`,
    {
      file: imageBlob,
    },
    { headers: { "Content-Type": imageBlob.type } },
  );
};

export const saveProductToShop = async (data: {
  storeId: string;
  productIds: string[];
}) => {
  return katanaAxios.post("/aliexpress/product/save", data);
};
