import BaseFormItem from "@components/login/BaseFormItem.tsx";
import { Button, TextField } from "@mui/material";

const FormVerifyItem = () => {
  return (
    <BaseFormItem direction={"column"} label={"验证码"} name={"verify"}>
      <TextField
        sx={{ width: "100%", height: 36 }}
        InputProps={{
          sx: { height: 36 },
          endAdornment: <Button variant={"text"}>获取验证码</Button>,
        }}
      />
    </BaseFormItem>
  );
};

export default FormVerifyItem;
