import { Button, Stack, Typography } from "@mui/material";

import AddProductToShopCTA from "@components/common/AddProductToShopCTA.tsx";
import SelectStore from "@components/common/SelectStore.tsx";
import { useAuth, useUser } from "@atoms/user.atom.ts";

const LoginAccount = () => {
  const { user } = useUser();
  const { logout } = useAuth();

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
          {`Pear 账号: ${user?.email ?? user.phoneNumber}`}
        </Typography>
        <Button
          variant={"contained"}
          sx={{ textTransform: "unset", width: 80, height: 36 }}
          onClick={logout}
        >
          <Typography variant={"body2"} fontWeight={600}>
            退出
          </Typography>
        </Button>
      </Stack>
      <Stack direction={"row"} alignItems={"center"}>
        <SelectStore />
      </Stack>
      <Stack>
        <AddProductToShopCTA />
      </Stack>
    </Stack>
  );
};

export default LoginAccount;
