import { useCallback } from "react";
import { LoginRequest } from "../../services/login.ts";
import { useSnackbar } from "notistack";
import {
  DEFAULT_SNACKBAR_ANCHOR_ORIGIN,
  DEFAULT_SNACKBAR_DURATION,
} from "../../utils/common.ts";
import { loginScheme } from "../../utils/scheme.ts";
import LoginFormContent from "../common/LoginFormContent.tsx";

const LoginForm = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = useCallback(() => {
    enqueueSnackbar("登录成功", {
      variant: "success",
      anchorOrigin: DEFAULT_SNACKBAR_ANCHOR_ORIGIN,
      autoHideDuration: DEFAULT_SNACKBAR_DURATION,
    });
  }, [enqueueSnackbar]);

  const handleFailed = useCallback(() => {
    enqueueSnackbar("账号或密码不正确，请重新登录", {
      variant: "error",
      anchorOrigin: DEFAULT_SNACKBAR_ANCHOR_ORIGIN,
      autoHideDuration: DEFAULT_SNACKBAR_DURATION,
    });
  }, [enqueueSnackbar]);

  return (
    <LoginFormContent<LoginRequest>
      onSubmit={handleFormSubmit}
      onFailed={handleFailed}
      scheme={loginScheme}
    />
  );
};

export default LoginForm;
