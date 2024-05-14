import { TextField } from "@mui/material";
import BaseFormItem from "@components/login/BaseFormItem.tsx";
import VerificationCodeCTA from "@components/common/VerificationCodeCTA.tsx";

export const EmailFormItem = ({
  direction = "row",
}: {
  direction?: "row" | "column";
}) => {
  return (
    <BaseFormItem direction={direction} label={"Pear账号"} name={"email"}>
      <TextField
        size={"small"}
        sx={{ width: direction === "row" ? 220 : "100%", height: 42 }}
        InputProps={{ sx: { height: 42 } }}
      />
    </BaseFormItem>
  );
};

export const PasswordFormItem = ({
  direction = "row",
}: {
  direction?: "row" | "column";
}) => {
  return (
    <BaseFormItem direction={direction} label={"密码"} name={"password"}>
      <TextField
        size={"small"}
        sx={{ width: direction === "row" ? 220 : "100%", height: 42 }}
        InputProps={{ sx: { height: 42 } }}
        type="password"
      />
    </BaseFormItem>
  );
};

export const VerifyCodeFormItem = ({
  direction = "row",
}: {
  direction?: "row" | "column";
}) => {
  return (
    <BaseFormItem
      direction={direction}
      label={"验证码"}
      name={"code"}
      action={<VerificationCodeCTA />}
    >
      <TextField
        sx={{ width: "100%", height: 42 }}
        InputProps={{
          sx: { height: 42 },
        }}
      />
    </BaseFormItem>
  );
};
