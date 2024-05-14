import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { Stack, Typography } from "@mui/material";
import React from "react";

interface BaseFormItemProps {
  direction?: "row" | "column";
  label: string;
  name: string;
  action?: React.ReactNode;
  children: React.ReactElement<
    ControllerRenderProps<FieldValues, string> & { error?: boolean }
  >;
}

const BaseFormItem = ({
  direction = "row",
  label,
  name,
  action,
  children,
}: BaseFormItemProps) => {
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
      <Typography variant={"body2"} fontWeight={600} component={"label"}>
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={2}
              sx={{ width: "100%", flex: 1 }}
            >
              {React.cloneElement(children, {
                ...field,
                error: !!errors[name],
              })}
              {action}
            </Stack>
          );
        }}
      />
    </Stack>
  );
};

export default BaseFormItem;
