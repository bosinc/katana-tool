import { cookieStorage } from "@utils/cookie.ts";
import {
  BASE_SERVER_URL,
  cookieUrl,
  PROJECT_TOKEN_NAME,
} from "@utils/common.ts";
import { StoreVO } from "../types";
import { StorageKeys, StorePlatform } from "../enum.ts";
import { isEmpty } from "ramda";
import { commonSyncStorage } from "@utils/storage.ts";

export const checkLogin = async () => {
  const cookie = await chrome.cookies.get({
    url: cookieUrl,
    name: PROJECT_TOKEN_NAME,
  });
  console.log({ cookie }, "cookie changed");
  return !!cookie && !isEmpty(cookie);
};

export const getServiceStoreList = async (): Promise<{
  isLogin: boolean;
  storeList?: StoreVO[];
}> => {
  const cookie = await cookieStorage.get(PROJECT_TOKEN_NAME);
  if (cookie) {
    const res = await fetch(`${BASE_SERVER_URL}/merchant/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
    });
    const list = await res.json();
    const storeList = list.data.items.filter(
      (item: StoreVO) => item.platform !== StorePlatform.SHOPIFY,
    );
    return { isLogin: true, storeList };
  }
  return { isLogin: false, storeList: [] };
};

export const addProductToStore = async (requestData: {
  merchantId: string;
  productIds: string[];
}) => {
  const cookie = await cookieStorage.get(PROJECT_TOKEN_NAME);
  if (cookie) {
    const res = await fetch(`${BASE_SERVER_URL}/aliexpress/product`, {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
    });
    const data = await res.json();
    return data.data;
  }
};

export const clearStoreMenus = async (list: StoreVO[]) => {
  return await Promise.all(
    list.map((item) => {
      const menuId = `store_item_${item.id}`;
      return chrome.contextMenus.remove(menuId);
    }),
  );
};

export const createStoreMenu = async (
  list: StoreVO[],
  parentId: string = "select_stores",
) => {
  const selectStoreId = await commonSyncStorage.get(
    StorageKeys.SELECT_STORE_ID,
  );
  list.forEach((item: StoreVO) => {
    const menuId = `store_item_${item.id}`;
    chrome.contextMenus.create({
      title: `添加到 - ${item.storeName}`,
      contexts: ["all"],
      id: menuId,
      parentId,
      checked: item.id === selectStoreId,
      type: "radio",
    });
  });
};

export const initContextMenus = async () => {
  const isLogin = await checkLogin();
  chrome.contextMenus.create({
    title: "一键添加到Pear",
    contexts: ["all"],
    id: "one_click_add",
  });
  chrome.contextMenus.create({
    type: "separator",
    contexts: ["all"],
    id: "separator_1",
  });

  chrome.contextMenus.create({
    title: "选择店铺",
    contexts: ["all"],
    id: "select_stores",
    visible: isLogin,
  });
  chrome.contextMenus.create({
    type: "separator",
    contexts: ["all"],
    id: "separator_2",
    parentId: "select_stores",
    visible: isLogin,
  });
  chrome.contextMenus.create({
    title: "前往登录插件",
    contexts: ["all"],
    id: "pear_login",
    visible: !isLogin,
  });
};
