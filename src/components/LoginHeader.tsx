import { AppBar, Toolbar } from "@mui/material";
import LoginForm from "./login/LoginForm.tsx";
import LoginAccount from "./login/LoginAccount.tsx";
import { useAuth } from "../atoms/user.atom.ts";

const LoginHeader = () => {
  const { isLogin } = useAuth();

  return (
    <AppBar position="sticky" color="transparent">
      <Toolbar sx={{ bgcolor: "white" }}>
        {!isLogin ? <LoginForm /> : <LoginAccount />}
      </Toolbar>
    </AppBar>
  );
};

export default LoginHeader;
