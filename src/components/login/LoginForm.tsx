import { useCallback } from "react";
import { loginScheme } from "@utils/scheme.ts";
import LoginFormContent from "@components/common/LoginFormContent.tsx";
import useBaseSnackbar from "@hooks/useBaseSnackbar.ts";

const LoginForm = () => {
  const { success, error } = useBaseSnackbar();

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

  return <LoginFormContent scheme={loginScheme} onFinished={handleSubmit} />;
};

export default LoginForm;
