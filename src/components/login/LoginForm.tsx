import { useCallback } from "react";
import { LoginRequest } from "../../services/login.ts";
import { loginScheme } from "../../utils/scheme.ts";
import LoginFormContent from "../common/LoginFormContent.tsx";
import useBaseSnackbar from "../../hooks/useBaseSnackbar.ts";

const LoginForm = () => {
  const { success, error } = useBaseSnackbar();

  const handleFormSubmit = useCallback(() => {
    success("登录成功");
  }, [success]);

  const handleFailed = useCallback(() => {
    error("账号或密码不正确，请重新登录");
  }, [error]);

  return (
    <LoginFormContent<LoginRequest>
      onSubmit={handleFormSubmit}
      onFailed={handleFailed}
      scheme={loginScheme}
    />
  );
};

export default LoginForm;
