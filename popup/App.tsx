import { CssBaseline, Stack, Typography } from "@mui/material";
import { useAuth } from "../src/atoms/user.atom.ts";
import LoginBaseInfo from "./component/LoginBaseInfo.tsx";
import LoginForm from "./component/LoginForm.tsx";
import { PROJECT_NAME } from "../src/utils/common.ts";

const App = () => {
  const { isLogin } = useAuth();

  return (
    <>
      <CssBaseline />
      <Stack sx={{ width: "100%", height: 540 }}>
        <Stack
          sx={{
            py: 2,
            alignItems: "center",
            borderBottom: "1px solid #f2f2fe",
          }}
        >
          <Typography
            variant="body1"
            fontSize={18}
            fontWeight={600}
            component="h2"
          >
            {PROJECT_NAME}
          </Typography>
        </Stack>
        <Stack
          sx={{
            flex: 1,
            width: "100%",
            p: 4,
          }}
        >
          {!isLogin ? <LoginForm /> : <LoginBaseInfo />}
        </Stack>
      </Stack>
    </>
  );
};

export default App;
