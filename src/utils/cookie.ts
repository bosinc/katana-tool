import { dropLast, head, last } from "ramda";
import { base64UrlDecode, base64UrlEncode } from "./string";
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";
import { cookieUrl, DOMAIN_WEB_URL } from "./common.ts";

const cookiePrefix = "alg:HS256,typ:JWT|";

export const decodeToken = (token: string) => {
  const keys = token.split(".");

  if (keys.length !== 2) return "";
  const jsonValue = decompressFromEncodedURIComponent(
    decodeURIComponent(head(keys)!),
  );
  const base64s =
    `${jsonValue.startsWith(cookiePrefix) ? "" : cookiePrefix}${jsonValue}`
      .split("|")
      .map((item) => {
        const json = item.split(",").reduce((obj: RecordAny, data: string) => {
          const [key, value] = data.split(":");
          obj[key] = /^[0-9]+$/.test(value) ? Number(value) : value;
          return obj;
        }, {});
        return base64UrlEncode(JSON.stringify(json));
      });
  return `${base64s.join(".")}.${last(keys)}`;
};

export const encodeToken = (token: string) => {
  if (!token) return "";
  const keys = token.split(".");

  const jsonValue = dropLast(1, keys)
    .map((data) => base64UrlDecode(data).replace(/[{"}]/g, ""))
    .join("|")
    .replace(cookiePrefix, "");
  const _token = `${compressToEncodedURIComponent(jsonValue)}.${last(keys)}`;

  if (token !== decodeToken(_token)) {
    throw Error(`encodeToken error , token: ${token}`);
  }

  return _token;
};

export const cookieStorage = {
  async get(key: string) {
    const cookie = await chrome.cookies.get({ url: cookieUrl, name: key });
    return cookie?.value ? decodeToken(cookie.value) : undefined;
  },
  async set(
    key: string,
    value: string | undefined,
    options: Partial<chrome.cookies.SetDetails>,
  ) {
    await chrome.cookies.remove({ name: key, url: cookieUrl });
    return chrome.cookies.set({
      ...options,
      url: cookieUrl,
      domain: DOMAIN_WEB_URL,
      name: key,
      value,
    });
  },
  remove(key: string) {
    return chrome.cookies.remove({ name: key, url: cookieUrl });
  },
};
