import LoginHeader from "@components/LoginHeader.tsx";
import ContentContainer from "@components/ContentContainer.tsx";
import { CssBaseline, Stack, ThemeProvider, useTheme } from "@mui/material";
import { DEFAULT_MENU_ITEM_ID } from "@utils/common.ts";
import MaskContainer from "@components/common/MaskContainer.tsx";

function App() {
  const theme = useTheme();

  const isIframe = DEFAULT_MENU_ITEM_ID === "iframe";

  const Container = isIframe ? MaskContainer : Stack;

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <CssBaseline />
        <Stack
          sx={{
            position: "relative",
            overflow: "auto",
            width: "1280px",
            height: "960px",
            bgcolor: "#fff",
            borderRadius: 4,
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <LoginHeader />
          <ContentContainer />
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
