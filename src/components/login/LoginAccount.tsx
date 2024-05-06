import { Button, Stack, Typography } from "@mui/material";
import { useAuth, useUser } from "../../atoms/user.atom.ts";
import { logout } from "../../services/login.ts";
import { useCallback } from "react";
import AddProductToShopCTA from "@components/common/AddProductToShopCTA.tsx";
import SelectStore from "@components/common/SelectStore.tsx";

const LoginAccount = () => {
  const { user } = useUser();
  const { checkLogin } = useAuth();

  const handleLogout = useCallback(async () => {
    await logout();
    await checkLogin();
  }, [checkLogin]);

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={2}
      width={"100%"}
    >
      <Stack direction={"row"} alignItems={"center"} gap={2}>
        <Typography variant="body2" fontWeight={600}>
          {`Pear 账号: ${user?.email}`}
        </Typography>
        <Button
          variant={"contained"}
          sx={{ textTransform: "unset", width: 80, height: 36 }}
          onClick={handleLogout}
        >
          <Typography variant={"body2"} fontWeight={600}>
            退出
          </Typography>
        </Button>
      </Stack>
      <Stack direction={"row"} alignItems={"center"}>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Typography variant="body2" fontWeight={600}>
            店铺
          </Typography>
          <SelectStore />
        </Stack>
      </Stack>
      <Stack>
        <AddProductToShopCTA />
      </Stack>
    </Stack>
  );
};

export default LoginAccount;
