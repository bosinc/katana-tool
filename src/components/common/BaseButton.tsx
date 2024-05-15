import {
  Button,
  ButtonProps,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

interface BaseButtonProps extends Omit<ButtonProps, "label"> {
  label: string;
  loading?: boolean;
}

const BaseButton = ({ label, loading = false, ...props }: BaseButtonProps) => {
  return (
    <Button
      variant={"contained"}
      {...props}
      sx={{
        background: "#31322c",
        "&:hover": {
          background: "#151d29",
        },
        ...props.sx,
      }}
    >
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        {loading && <CircularProgress size={14} color={"inherit"} />}
        <Typography variant={"body2"} fontWeight={600}>
          {label}
        </Typography>
      </Stack>
    </Button>
  );
};

export default BaseButton;
