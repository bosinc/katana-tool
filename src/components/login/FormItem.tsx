import {
  Stack,
  StandardTextFieldProps,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, ControllerProps, useFormContext } from "react-hook-form";

interface FormItemProps extends StandardTextFieldProps {
  label: string;
  name: string;
  rules?: ControllerProps["rules"];
  direction?: "row" | "column";
}

const FormItem = ({ label, name, direction }: FormItemProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Stack
      direction={direction}
      alignItems={direction === "row" ? "center" : "flex-start"}
      gap={1}
      sx={{ width: direction === "row" ? "auto" : "100%" }}
    >
      <Typography variant={"body2"} fontWeight={600}>
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        defaultValue={""}
        render={({ field }) => {
          return (
            <TextField
              {...field}
              hiddenLabel
              size={"small"}
              sx={{ width: direction === "row" ? 220 : "100%", height: 36 }}
              InputProps={{ sx: { height: 36 } }}
              error={!!errors[name]}
            />
          );
        }}
      />
    </Stack>
  );
};

export default FormItem;
