import { Stack, Typography, useTheme } from "@mui/material";
import { PROJECT_NAME } from "@utils/common.ts";

const TitleHeader = () => {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        py: 2,
        alignItems: "center",
        borderBottom: "1px solid #f2f2fe",
        bgcolor: theme.palette.common.black,
      }}
    >
      <Typography
        variant="body1"
        fontSize={18}
        fontWeight={600}
        component="h2"
        color={"white"}
      >
        {PROJECT_NAME}
      </Typography>
    </Stack>
  );
};

export default TitleHeader;
