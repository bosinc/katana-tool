import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

import { useCallback, useEffect, useRef } from "react";
import tokenUtil from "@utils/token.ts";
import { isEmpty } from "ramda";
import type { TokenState } from "../types";
import { commonSyncStorage } from "@utils/storage.ts";
import { StorageKeys } from "../enum.ts";

export const userAtom = atom<Partial<TokenState>>({} as Partial<TokenState>);

export const tokenAtom = atom<string | undefined>(undefined);

export const useAuth = () => {
  const [token, updateToken] = useAtom(tokenAtom);
  const updateUser = useSetAtom(userAtom);

  const checkLogin = useCallback(async () => {
    const token = await tokenUtil.getToken();
    updateToken(token ?? "");
    return !isEmpty(token);
  }, [updateToken]);

  useEffect(() => {
    checkLogin().then(() => {});
  }, [checkLogin]);

  const logout = useCallback(async () => {
    updateUser({});
    updateToken(undefined);
    await tokenUtil.removeToken();
    await commonSyncStorage.set(StorageKeys.SELECT_STORE_ID, "");
    await checkLogin();
  }, [updateToken, updateUser, checkLogin]);

  return { checkLogin, token, isLogin: !!token, logout };
};

export const useUser = () => {
  const [user, updateUser] = useAtom(userAtom);
  const token = useAtomValue(tokenAtom);

  const initStatusRef = useRef(false);

  const initUser = useCallback(async () => {
    if (initStatusRef.current) return;
    initStatusRef.current = true;
    const tokenUser = await tokenUtil.parse();
    console.log({ tokenUser });
    updateUser(tokenUser);
  }, [updateUser]);

  useEffect(() => {
    if (token && !isEmpty(token)) {
      initUser().then(() => {
        initStatusRef.current = false;
      });
    }
  }, [token, initUser]);

  useEffect(() => {
    if (!user?.userId) {
      initUser().then(() => {
        initStatusRef.current = false;
      });
    }
  }, [user, initUser]);

  const clearUser = useCallback(() => {
    updateUser({});
  }, [updateUser]);

  return { user, clearUser };
};
