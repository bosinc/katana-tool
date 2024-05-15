import { cookieStorage, encodeToken } from "./cookie";
import { base64UrlDecode } from "./string";
import { TokenState } from "../types";
import { PROJECT_TOKEN_NAME } from "./common";

export interface AuthLocalCachedState {
  token?: string;
}

export const jwtDecode = (token: string) => {
  const part = token.split(".")[1];
  return JSON.parse(base64UrlDecode(part)) as TokenState;
};

const tokenUtil = {
  tokenMap: {} as Record<string, string | undefined>,

  async getToken(key = PROJECT_TOKEN_NAME) {
    if (!this.tokenMap[key]) {
      this.tokenMap[key] = await cookieStorage.get(key);
    }
    return this.tokenMap[key];
  },

  async parse(value?: string): Promise<Partial<TokenState>> {
    const token = value ?? (await this.getToken());
    return token ? jwtDecode(token) : {};
  },

  async check() {
    const exp = (await this.parse())?.exp;
    return exp ? exp < Date.now() : false;
  },

  async removeToken(key = PROJECT_TOKEN_NAME) {
    this.tokenMap = {};
    await cookieStorage.set(key, "", {
      expirationDate: -1,
    });
  },

  async save(input: AuthLocalCachedState, key = PROJECT_TOKEN_NAME) {
    this.tokenMap[key] = input.token || "";

    const formatToken = encodeToken(input.token || "");

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 365);

    await cookieStorage.set(key, formatToken, {
      expirationDate: expirationDate.getTime() / 1000,
    });
  },
};

export default tokenUtil;
