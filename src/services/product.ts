import katanaAxios from "./request.ts";
import { DEFAULT_SEARCH_PRODUCT_COUNT } from "../utils/common.ts";
import { ImageSearchResponseItem } from "@katana-common/response/aliexpress.response.ts";

export const searchAliProduct = async (
  imageBlob: Blob,
  count = DEFAULT_SEARCH_PRODUCT_COUNT,
): Promise<{ products: ImageSearchResponseItem[]; total: number }> => {
  const formData = new FormData();
  formData.append("file", imageBlob);
  return katanaAxios.post(
    `/aliexpress/image/search?productCnt=${count}`,
    formData,
    { headers: { "Content-Type": imageBlob.type } },
  );
};

export const saveProductToShop = async (data: {
  merchantId: string;
  productIds: string[];
}) => {
  return katanaAxios.post("/aliexpress/product/save", data);
};
