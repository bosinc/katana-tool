import { LoginRequest } from "@services/login.ts";
import { loginScheme } from "@utils/scheme.ts";
import { useCallback, useEffect, useState } from "react";
import { Alert, Collapse, Stack } from "@mui/material";
import { isEmpty } from "ramda";
import LoginFormContent from "@components/common/LoginFormContent.tsx";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = useCallback((isSuccess: boolean) => {
    setErrorMessage(isSuccess ? "" : "账号或密码不正确，请重新登录");
  }, []);

  useEffect(() => {
    if (!isEmpty(errorMessage)) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        clearTimeout(timer);
      }, 3000);
    }
  }, [errorMessage]);

  return (
    <Stack gap={2}>
      <Collapse in={!isEmpty(errorMessage)}>
        <Alert severity={"error"} variant={"outlined"}>
          {errorMessage}
        </Alert>
      </Collapse>
      <LoginFormContent<LoginRequest>
        direction={"column"}
        onFinished={handleSubmit}
        scheme={loginScheme}
      />
    </Stack>
  );
};

export default LoginForm;
