import { commonSyncStorage } from "./utils/storage";
import { MessageActionType, StorageKeys } from "./types";
import { DEFAULT_MENU_ITEM_ID } from "./utils/common.ts";

console.log("service worker init!!!");

type ServiceWorkerData = {
  windows: chrome.windows.Window | null;
  baseUrl?: string;
};

const data: ServiceWorkerData = {
  windows: null,
};
const dataHandler: ProxyHandler<ServiceWorkerData> = {};
const dataProxy = new Proxy(data, dataHandler);

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  dataProxy.baseUrl = info.srcUrl;
  await commonSyncStorage.set(StorageKeys.BASE_URL, info.srcUrl);
  switch (info.menuItemId) {
    case "iframe": {
      if (tab?.id) {
        await chrome.tabs.sendMessage(tab.id, { action: "insertIframe" });
      }
      break;
    }
    case "window": {
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
      break;
    }
    default:
  }
});

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    title: "在AliExpress中搜索商品",
    contexts: ["image"],
    id: DEFAULT_MENU_ITEM_ID,
  });
});

chrome.windows.onRemoved.addListener(async () => {
  await commonSyncStorage.set(StorageKeys.BASE_URL, "");
  dataProxy.windows = null;
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`,
    );
  }
});
