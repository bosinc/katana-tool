import { useCallback, useRef } from "react";
import { Stack } from "@mui/material";
import useAutoLoading from "@hooks/useAutoLoading.ts";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  CodeLoginResponse,
  login,
  loginByCode,
  LoginRequest,
} from "@services/login.ts";
import tokenUtil from "@utils/token.ts";
import { useAuth } from "@atoms/user.atom.ts";
import BaseButton from "@components/common/BaseButton.tsx";
import {
  EmailFormItem,
  PasswordFormItem,
  VerifyCodeFormItem,
} from "@components/login/FormItem.tsx";

interface LoginFormContentProps<T extends RecordAny> {
  direction?: "row" | "column";
  scheme: yup.ObjectSchema<T>;
  type?: "password" | "code";
  onFinished?: (isSuccess: boolean) => void;
}

const LoginFormContent = <T extends RecordAny>({
  direction = "row",
  scheme,
  type = "password",
  onFinished,
}: LoginFormContentProps<T>) => {
  // @ts-expect-error -- to do
  const methods = useForm<T>({ resolver: yupResolver(scheme) });
  const { checkLogin } = useAuth();
  const formRef = useRef(null);

  const handleFormSubmit = useCallback(
    async (values: T) => {
      console.log({ values });
      try {
        const { token } = await (type === "password"
          ? login(values as unknown as LoginRequest)
          : loginByCode(values as unknown as CodeLoginResponse));
        await tokenUtil.save({ token });
        await checkLogin();
        onFinished?.(true);
      } catch (error) {
        onFinished?.(false);
      }
    },
    [checkLogin, onFinished, type],
  );

  const { loading, run: submitForm } = useAutoLoading<T>(handleFormSubmit);

  return (
    <FormProvider {...methods}>
      <form
        ref={formRef}
        onSubmit={methods.handleSubmit(
          submitForm as unknown as SubmitHandler<T>,
        )}
        style={{ width: "100%" }}
      >
        <Stack
          direction={direction}
          gap={2}
          sx={{ width: "100%", justifyContent: "space-between" }}
        >
          <Stack direction={direction} gap={2}>
            <EmailFormItem direction={direction} />
            {type === "password" ? (
              <PasswordFormItem direction={direction} />
            ) : (
              <VerifyCodeFormItem direction={direction} />
            )}
          </Stack>

          <BaseButton
            label={"登录"}
            type={"submit"}
            disabled={loading}
            loading={loading}
            sx={{
              textTransform: "unset",
              width: direction === "row" ? 180 : "100%",
              height: 42,
            }}
          />
        </Stack>
      </form>
    </FormProvider>
  );
};

export default LoginFormContent;
