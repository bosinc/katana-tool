import { CircularProgress, Stack, Typography } from "@mui/material";
import { isEmpty } from "ramda";

interface LoadingProps {
  tip?: string;
  size?: number;
}

const Loading = ({ tip, size = 20 }: LoadingProps) => {
  return (
    <Stack
      sx={{
        width: "100%",
        alignItems: "center",
        gap: 1,
        minHeight: 150,
        justifyContent: "center",
      }}
    >
      <CircularProgress size={size} />
      {isEmpty(tip) ? null : (
        <Typography fontSize={12} fontWeight={600}>
          {tip}
        </Typography>
      )}
    </Stack>
  );
};

export default Loading;
