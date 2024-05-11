import { PropsWithChildren } from "react";
import { Stack, Typography, useTheme } from "@mui/material";

const BlankContainer = <T extends RecordAny>({
  data,
  tip,
  children,
}: PropsWithChildren<{ tip: string; data: T[] }>) => {
  const theme = useTheme();
  return (
    <>
      {data.length === 0 ? (
        <Stack
          sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            py: 3,
          }}
        >
          <Typography
            fontSize={14}
            fontWeight={500}
            color={theme.palette.grey["500"]}
          >
            {tip}
          </Typography>
        </Stack>
      ) : (
        children
      )}
    </>
  );
};

export default BlankContainer;
