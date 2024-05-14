import { CssBaseline, Stack, Typography } from "@mui/material";
import { useAuth } from "@atoms/user.atom.ts";
import LoginBaseInfo from "./component/LoginBaseInfo.tsx";
import TitleHeader from "@components/common/TitleHeader.tsx";
import BaseButton from "@components/common/BaseButton.tsx";
import { useCallback } from "react";

const App = () => {
  const { isLogin } = useAuth();

  const toLogin = useCallback(() => {
    const loginPath = chrome.runtime.getURL("/login/index.html");
    window.open(loginPath, "_blank");
  }, []);

  return (
    <>
      <CssBaseline />
      <Stack sx={{ width: "100%", height: 540 }}>
        <TitleHeader />
        <Stack
          sx={{
            flex: 1,
            width: "100%",
            p: 4,
          }}
        >
          {!isLogin ? (
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              gap={2}
              sx={{ width: "100%", height: "100%" }}
            >
              <Typography fontSize={14} fontWeight={700}>
                您还没有登录
              </Typography>
              <BaseButton
                onClick={toLogin}
                label={"去登录"}
                sx={{
                  width: "100%",
                  textTransform: "unset",
                  height: 42,
                }}
              />
            </Stack>
          ) : (
            <LoginBaseInfo />
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default App;
