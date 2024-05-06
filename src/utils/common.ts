import { SnackbarOrigin } from "notistack";

export const COOKIE_PREFIX_NAME: string =
  import.meta.env.VITE_PUBLIC_COOKIE_PREFIX ?? "katana_web";

export const PROJECT_TOKEN_NAME = `${COOKIE_PREFIX_NAME}_auth_token`;

export const BASE_SERVER_URL = import.meta.env.VITE_PUBLIC_SERVER_URL;

export const DOMAIN_WEB_URL = import.meta.env.VITE_PUBLIC_DOMAIN;

export const cookieUrl = `https://${DOMAIN_WEB_URL}`;

export const DEFAULT_SNACKBAR_DURATION = 3000;

export const DEFAULT_SNACKBAR_ANCHOR_ORIGIN: SnackbarOrigin = {
  vertical: "top",
  horizontal: "right",
};

export const CARD_WIDTH = 232;
export const CARD_MEDIA_HEIGHT = 232;

export const DEFAULT_SEARCH_PRODUCT_COUNT = 150;

export const DEFAULT_MENU_ITEM_ID = import.meta.env.VITE_PUBLIC_MENU_ITEM_ID;

export const PRODUCT_NAME = import.meta.env.VITE_PUBLIC_PRODUCT_NAME;
