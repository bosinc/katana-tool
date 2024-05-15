import { useAuth, useUser } from "@atoms/user.atom.ts";
import { IconButton, Stack, Typography } from "@mui/material";
import SelectStore from "@components/common/SelectStore.tsx";
import { Logout as LogoutIcon } from "@mui/icons-material";

const LoginBaseInfo = () => {
  const { user } = useUser();
  const { logout } = useAuth();

  return (
    <Stack
      justifyContent={"space-between"}
      sx={{ width: "100%", height: "100%" }}
    >
      <Stack sx={{ gap: 3 }}>
        <SelectStore direction={"column"} />
      </Stack>

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={3}
      >
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "inline-block",
            whiteSpace: "nowrap",
          }}
        >
          {`Pear 账号: ${user?.email ?? user.phoneNumber}`}
        </Typography>
        <IconButton size={"small"} onClick={logout} title={"退出登录"}>
          <LogoutIcon color={"error"} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default LoginBaseInfo;
