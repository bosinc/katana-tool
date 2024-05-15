import { codeLoginSchema } from "../src/utils/scheme";
import { Stack, Typography } from "@mui/material";
import TitleHeader from "../src/components/common/TitleHeader";
import LoginFormContent from "../src/components/common/LoginFormContent";
import useBaseSnackbar from "../src/hooks/useBaseSnackbar";
import { useCallback } from "react";
import { useAuth } from "../src/atoms/user.atom";

const Login = () => {
  const { success, error } = useBaseSnackbar();
  const { isLogin } = useAuth();

  const handleSubmit = useCallback(
    (isSuccess: boolean) => {
      if (isSuccess) {
        success("登录成功");
      } else {
        error("账号或密码不正确，请重新登录");
      }
    },
    [error, success],
  );

  return (
    <Stack>
      <TitleHeader />
      <Stack sx={{ width: "100%", maxWidth: 560, mx: "auto", p: 3 }}>
        {isLogin ? (
          <Typography align={"center"} fontWeight={700} fontSize={14}>
            您已经登录
          </Typography>
        ) : (
          <LoginFormContent
            direction={"column"}
            type={"code"}
            scheme={codeLoginSchema}
            onFinished={handleSubmit}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default Login;
