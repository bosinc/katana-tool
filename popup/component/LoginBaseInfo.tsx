import { useAuth, useUser } from "@atoms/user.atom.ts";
import { Button, Stack, Typography } from "@mui/material";
import SelectStore from "@components/common/SelectStore.tsx";

const LoginBaseInfo = () => {
  const { user } = useUser();
  const { logout } = useAuth();

  return (
    <Stack
      justifyContent={"space-between"}
      sx={{ width: "100%", height: "100%" }}
    >
      <Stack sx={{ gap: 3 }}>
        <Typography variant="body2" fontWeight={600}>
          {`Pear 账号: ${user?.email ?? ""}`}
        </Typography>

        <SelectStore />
      </Stack>
      <Button
        variant={"outlined"}
        color={"error"}
        sx={{ textTransform: "unset", height: 36 }}
        onClick={logout}
      >
        <Typography variant={"body2"} fontWeight={600}>
          退出
        </Typography>
      </Button>
    </Stack>
  );
};

export default LoginBaseInfo;
