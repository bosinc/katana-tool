import { atom, useAtom, useAtomValue } from "jotai";
import { TokenState } from "../types.ts";
import { useCallback, useEffect, useRef } from "react";
import tokenUtil from "../utils/token.ts";
import { isEmpty } from "ramda";

export const userAtom = atom<Partial<TokenState>>({} as Partial<TokenState>);

export const tokenAtom = atom<string | undefined>(undefined);

export const useAuth = () => {
  const [token, updateToken] = useAtom(tokenAtom);

  const checkLogin = useCallback(async () => {
    const token = await tokenUtil.getToken();
    updateToken(token ?? "");
    return !isEmpty(token);
  }, [updateToken]);

  useEffect(() => {
    checkLogin().then(() => {});
  }, []);

  return { checkLogin, token, isLogin: !!token };
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
  }, []);

  useEffect(() => {
    if (!user?.userId && !isEmpty(token)) {
      initUser().then(() => {
        initStatusRef.current = false;
      });
    }
  }, [token, user, initUser]);

  return { user };
};
