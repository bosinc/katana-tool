import { useAuth, useUser } from "../../src/atoms/user.atom.ts";
import { Button, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import { logout } from "../../src/services/login.ts";
import SelectStore from "../../src/components/common/SelectStore.tsx";

const LoginBaseInfo = () => {
  const { user } = useUser();
  const { checkLogin } = useAuth();

  const handleLogout = useCallback(async () => {
    await logout();
    await checkLogin();
  }, [checkLogin]);

  return (
    <Stack
      justifyContent={"space-between"}
      sx={{ width: "100%", height: "100%" }}
    >
      <Stack sx={{ gap: 3 }}>
        <Typography variant="body2" fontWeight={600}>
          {`Pear 账号: ${user?.email ?? ""}`}
        </Typography>

        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Typography variant="body2" fontWeight={600}>
            店铺
          </Typography>
          <SelectStore />
        </Stack>
      </Stack>
      <Button
        variant={"outlined"}
        color={"error"}
        sx={{ textTransform: "unset", height: 36 }}
        onClick={handleLogout}
      >
        <Typography variant={"body2"} fontWeight={600}>
          退出
        </Typography>
      </Button>
    </Stack>
  );
};

export default LoginBaseInfo;
