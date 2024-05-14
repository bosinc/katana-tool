import { Stack, Typography } from "@mui/material";
import { PROJECT_NAME } from "@utils/common.ts";

const TitleHeader = () => {
  return (
    <Stack
      sx={{
        py: 2,
        alignItems: "center",
        borderBottom: "1px solid #f2f2fe",
      }}
    >
      <Typography variant="body1" fontSize={18} fontWeight={600} component="h2">
        {PROJECT_NAME}
      </Typography>
    </Stack>
  );
};

export default TitleHeader;
