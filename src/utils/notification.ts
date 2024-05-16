import { PROJECT_NAME } from "@utils/common.ts";

export enum Notification {
  ADD_PRODUCT = "add_product",
  LOGIN_STATUS = "login_status",
  STORES_REFRESH = "stores_refresh",
  SELECT_STORE = "select_store",
}

export const notification = {
  prevNotificationId: "",
  message(message: string) {
    chrome.notifications.clear(this.prevNotificationId, () => {
      chrome.notifications.create(
        {
          type: "basic",
          iconUrl: "icons/icon_128.png",
          title: PROJECT_NAME,
          message,
        },
        (notificationId) => {
          this.prevNotificationId = notificationId;
        },
      );
    });
  },
};
