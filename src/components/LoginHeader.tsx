import { AppBar, Toolbar } from "@mui/material";
import LoginAccount from "./login/LoginAccount.tsx";
import { useAuth } from "@atoms/user.atom.ts";
import ToLoginCTA from "@components/login/ToLoginCTA.tsx";

const LoginHeader = () => {
  const { isLogin } = useAuth();

  return (
    <AppBar position="sticky" color="transparent">
      <Toolbar sx={{ bgcolor: "white", width: "100%" }}>
        {!isLogin ? <ToLoginCTA width={220} /> : <LoginAccount />}
      </Toolbar>
    </AppBar>
  );
};

export default LoginHeader;
