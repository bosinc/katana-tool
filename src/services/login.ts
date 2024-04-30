import md5 from "blueimp-md5";
import katanaAxios from "./request.ts";
import { StorageKeys, StoreVO, UserVO } from "../types.ts";
import tokenUtil from "../utils/token.ts";
import { commonSyncStorage } from "../utils/storage.ts";

export interface LoginRequest {
  email: string;
  password: string;
}

const pwdMd5 = (pwd: string) => {
  return [...md5(pwd)].reduce(
    (ac, char, index) => ac + (index % 2 ? char.toUpperCase() : char),
    "",
  );
};

export const login = async (data: LoginRequest) => {
  return katanaAxios.post<LoginRequest, { token: string }>(
    `/auth/merchant-login`,
    {
      ...data,
      password: pwdMd5(data.password),
    },
  );
};

export const logout = async () => {
  await tokenUtil.removeToken();
  await commonSyncStorage.set(StorageKeys.SELECT_STORE_ID, "");
};

export const getSelf = async (): Promise<{ user: UserVO }> => {
  return katanaAxios.get("/merchantUser/self");
};

export const getMerchantStoreList = (): Promise<{ items: StoreVO[] }> => {
  console.log("update stores");
  return katanaAxios.get("/merchant/list");
};
