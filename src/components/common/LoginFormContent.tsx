import { useCallback, useRef } from "react";
import FormItem from "../login/FormItem.tsx";
import { Button, Stack, Typography } from "@mui/material";
import useAutoLoading from "../../hooks/useAutoLoading.ts";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login, LoginRequest } from "../../services/login.ts";
import tokenUtil from "../../utils/token.ts";
import { useAuth } from "../../atoms/user.atom.ts";

interface LoginFormContentProps<T extends RecordAny> {
  direction?: "row" | "column";
  onSubmit?: () => void;
  onFailed?: (error: Error) => void;
  scheme: yup.ObjectSchema<T>;
}

const LoginFormContent = <T extends LoginRequest>({
  direction = "row",
  onSubmit,
  onFailed,
  scheme,
}: LoginFormContentProps<T>) => {
  // @ts-expect-error -- to do
  const methods = useForm<T>({ resolver: yupResolver(scheme) });
  const { checkLogin } = useAuth();
  const formRef = useRef(null);

  const handleFormSubmit = useCallback(
    async (values: T) => {
      try {
        const { token } = await login(values);
        await tokenUtil.save({ token });
        await checkLogin();
        onSubmit?.();
      } catch (error) {
        onFailed?.(error as Error);
      }
    },
    [onFailed, onSubmit, checkLogin],
  );

  const { loading, run: submitForm } = useAutoLoading<T>(handleFormSubmit);

  return (
    <FormProvider {...methods}>
      <form
        ref={formRef}
        onSubmit={methods.handleSubmit(
          submitForm as unknown as SubmitHandler<T>,
        )}
      >
        <Stack direction={direction} justifyContent="center" gap={2}>
          <FormItem
            label={"Pear账号"}
            name={"email"}
            rules={{ required: true }}
            direction={direction}
            type="email"
          />
          <FormItem
            label={"密码"}
            name={"password"}
            type={"password"}
            rules={{ required: true }}
            direction={direction}
          />
          <Button
            sx={{
              textTransform: "unset",
              width: direction === "row" ? 180 : "100%",
              height: 36,
            }}
            variant="contained"
            type="submit"
            disabled={loading}
          >
            <Typography variant={"body2"} fontWeight={600}>
              Login
            </Typography>
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default LoginFormContent;
