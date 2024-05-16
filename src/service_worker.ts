import { commonSyncStorage } from "./utils/storage";
import { MessageActionType, StorageKeys } from "./enum.ts";
import { StoreVO } from "./types";
import {
  addProductToStore,
  checkLogin,
  clearStoreMenus,
  createStoreMenu,
  getServiceStoreList,
  initContextMenus,
} from "@utils/serviceUtil.ts";
import {
  cookieUrl,
  DOMAIN_WEB_URL,
  PROJECT_TOKEN_NAME,
} from "@utils/common.ts";
import { clone } from "ramda";
import { notification } from "@utils/notification.ts";

console.log("service worker init!!!");

type ServiceWorkerData = {
  windows: chrome.windows.Window | null;
  baseUrl?: string;
  stores: StoreVO[];
  selectedStoreId?: string;
};
const data: ServiceWorkerData = {
  windows: null,
  stores: [],
};

const dataHandler: ProxyHandler<ServiceWorkerData> = {
  get(target: ServiceWorkerData, p: keyof ServiceWorkerData) {
    return target[p];
  },
  set(target: ServiceWorkerData, p: keyof ServiceWorkerData, newValue) {
    if (p === "stores") {
      const oldValue = clone(target[p]);
      clearStoreMenus(oldValue).then(() => {
        createStoreMenu(newValue, "select_stores").then(() => {});
      });
    }
    if (p === "selectedStoreId") {
      commonSyncStorage
        .set(StorageKeys.SELECT_STORE_ID, newValue)
        .then(() => {});
    }
    if (p === "baseUrl") {
      commonSyncStorage.set(StorageKeys.BASE_URL, newValue).then(() => {});
    }
    target[p] = newValue;
    return true;
  },
};
const dataProxy = new Proxy(data, dataHandler);

async function addProduct(info: chrome.contextMenus.OnClickData) {
  const url = new URL(info.linkUrl ?? info.pageUrl);
  if (url.host === "www.aliexpress.com" && url.pathname.startsWith("/item/")) {
    const matchData = url.pathname.match(/\/([^/.]+)\./);
    if (matchData) {
      const productId = matchData[1];
      if (dataProxy.selectedStoreId) {
        const res = await addProductToStore({
          merchantId: dataProxy.selectedStoreId,
          productIds: [productId],
        });
        const failCount = res.failed.length;
        const duplicateCount = res.duplicate.length;
        let message = "商品添加成功";
        if (failCount > 0) {
          message = "商品添加失败";
        } else if (duplicateCount > 0) {
          message = "商品已存在该店铺中";
        }
        notification.message(message);
      }
    }
  } else {
    notification.message("当前链接不是商品");
  }
}

async function onContextMenusClick(info: chrome.contextMenus.OnClickData) {
  dataProxy.baseUrl = info.srcUrl;
  await commonSyncStorage.set(StorageKeys.BASE_URL, info.srcUrl);

  if (info.menuItemId === "window") {
    if (!dataProxy.windows) {
      dataProxy.windows = await chrome.windows.create({
        url: "index.html",
        type: "popup",
        width: 1280,
        height: 960,
        top: 100,
        left: 100,
      });
    } else {
      await chrome.runtime.sendMessage({
        action: MessageActionType.IMAGE_ACTION,
        data: dataProxy.baseUrl,
      });
    }
  } else if (info.menuItemId.toString().startsWith("store_item_")) {
    const storeId = info.menuItemId.toString().split("_").pop();
    if (storeId) {
      dataProxy.selectedStoreId = storeId;
      notification.message("默认店铺已更换");
    }
    await addProduct(info);
  } else if (info.menuItemId === "pear_login") {
    await chrome.tabs.create({
      url: chrome.runtime.getURL("login/index.html"),
    });
  } else if (info.menuItemId === "pear_logout") {
    await chrome.cookies.remove({
      url: cookieUrl,
      name: PROJECT_TOKEN_NAME,
    });
    dataProxy.selectedStoreId = "";
    notification.message("账号已退出登录");
  } else if (info.menuItemId === "one_click_add") {
    await addProduct(info);
  } else if (info.menuItemId === "pear_refresh_stores") {
    await createStoreMenuItem();
    notification.message("店铺信息已刷新");
  }
}

async function createStoreMenuItem() {
  const isLogin = await checkLogin();
  const selectStoreId = await commonSyncStorage.get(
    StorageKeys.SELECT_STORE_ID,
  );
  if (isLogin) {
    const { storeList } = await getServiceStoreList();
    if (storeList && storeList.length > 0) {
      chrome.contextMenus.update("separator_2", { visible: true });
      if (
        !selectStoreId ||
        storeList.findIndex((item) => item.id === selectStoreId) < 0
      ) {
        dataProxy.selectedStoreId = storeList[0].id;
      }
      dataProxy.stores = storeList;
    } else {
      chrome.contextMenus.update("separator_2", { visible: false });
    }
  }
}

async function createSecondStoreMenuItem() {
  chrome.contextMenus.create({
    title: "退出登录",
    contexts: ["all"],
    id: "pear_logout",
    parentId: "select_stores",
  });
  chrome.contextMenus.create({
    title: "刷新店铺信息",
    contexts: ["all"],
    id: "pear_refresh_stores",
    parentId: "select_stores",
  });
  await createStoreMenuItem();
}

async function updateContextMenus() {
  const isLogin = await checkLogin();
  chrome.contextMenus.update("pear_login", { visible: !isLogin });
  chrome.contextMenus.update("select_stores", { visible: isLogin });
  await createStoreMenuItem();
}

chrome.contextMenus.onClicked.addListener(onContextMenusClick);

chrome.runtime.onInstalled.addListener(async () => {
  dataProxy.selectedStoreId = await commonSyncStorage.get(
    StorageKeys.SELECT_STORE_ID,
  );
  await initContextMenus();
  await createSecondStoreMenuItem();
});

chrome.windows.onRemoved.addListener(async () => {
  await commonSyncStorage.set(StorageKeys.BASE_URL, "");
  dataProxy.windows = null;
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
    clearStoreMenus(dataProxy.stores).then(() => {
      createStoreMenu(dataProxy.stores, "select_stores").then(() => {});
    });
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`,
    );
  }
});

chrome.cookies.onChanged.addListener(async (changes) => {
  if (
    changes.cookie.domain.includes(DOMAIN_WEB_URL) &&
    changes.cookie.name === PROJECT_TOKEN_NAME
  ) {
    await updateContextMenus();
  }
});
