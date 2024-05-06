import { LoginRequest } from "@services/login.ts";
import { loginScheme } from "@utils/scheme.ts";
import { useCallback, useEffect, useState } from "react";
import LoginFormContent from "@components/common/LoginFormContent.tsx";
import { Alert, Collapse, Stack } from "@mui/material";
import { isEmpty } from "ramda";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleFailed = useCallback(() => {
    setErrorMessage("账号或密码不正确，请重新登录");
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
        onFailed={handleFailed}
        scheme={loginScheme}
      />
    </Stack>
  );
};

export default LoginForm;
