import { CssBaseline, Stack, Typography } from "@mui/material";
import { useAuth } from "@atoms/user.atom.ts";
import LoginBaseInfo from "./component/LoginBaseInfo.tsx";
import TitleHeader from "@components/common/TitleHeader.tsx";
import ToLoginCTA from "@components/login/ToLoginCTA.tsx";

const App = () => {
  const { isLogin } = useAuth();

  return (
    <>
      <CssBaseline />
      <Stack sx={{ width: "100%", height: 420 }}>
        <TitleHeader />
        <Stack
          sx={{
            flex: 1,
            width: "100%",
            p: 2,
          }}
        >
          {!isLogin ? (
            <Stack
              justifyContent={"flex-start"}
              alignItems={"center"}
              gap={2}
              sx={{ width: "100%", height: "100%", pt: 4 }}
            >
              <Typography fontSize={14} fontWeight={700}>
                您还没有登录
              </Typography>
              <ToLoginCTA type={"link"} />
            </Stack>
          ) : (
            <LoginBaseInfo />
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default App;
