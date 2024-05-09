import katanaAxios from "./request.ts";
import { DEFAULT_SEARCH_PRODUCT_COUNT } from "@utils/common.ts";
import {
  ImageSearchResponseItem,
  ProductSaveResponse,
} from "response/aliexpress.response";

export const searchAliProduct = async (
  imageBlob: Blob,
  count = DEFAULT_SEARCH_PRODUCT_COUNT,
): Promise<{ products: ImageSearchResponseItem[]; total: number }> => {
  const formData = new FormData();
  formData.append("file", imageBlob);
  return katanaAxios.post(
    `/aliexpress/image/search?product-cnt=${count}`,
    formData,
    { headers: { "Content-Type": imageBlob.type } },
  );
};

export const saveProductToShop = async (data: {
  merchantId: string;
  productIds: string[];
}): Promise<ProductSaveResponse> => {
  return katanaAxios.post("/aliexpress/product", data);
};
