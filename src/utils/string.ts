export const base64Encode = (text: string) => btoa(text).replace(/=+$/, "");

export const base64UrlEncode = (text: string) =>
  base64Encode(text).replace(/\+/g, "-").replace(/\//g, "_");

export const base64Decode = (text: string) => atob(text).toString();

export const base64UrlDecode = (text: string) =>
  base64Decode(text.replace(/-/g, "+").replace(/_/g, "/"));
