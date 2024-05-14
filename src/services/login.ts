import md5 from "blueimp-md5";
import katanaAxios from "./request.ts";
import type { StoreVO, UserVO } from "../types.d.ts";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CodeLoginResponse {
  email: string;
  code: string;
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
      password: pwdMd5(data.password ?? ""),
    },
  );
};

export const loginByCode = async (data: CodeLoginResponse) => {
  return katanaAxios.post<CodeLoginResponse, { token: string }>(`/auth/login`, {
    ...data,
  });
};

export const sendVerificationCode = async (email: string) => {
  return katanaAxios.post("/auth/code", { email });
};

export const getUserInfo = async (): Promise<UserVO> => {
  return katanaAxios.get("/user/self");
};

export const getMerchantStoreList = (): Promise<{ items: StoreVO[] }> => {
  return katanaAxios.get("/merchant/list");
};
