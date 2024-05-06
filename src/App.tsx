import LoginHeader from "@components/LoginHeader.tsx";
import ContentContainer from "@components/ContentContainer.tsx";
import { CssBaseline, Stack, ThemeProvider, useTheme } from "@mui/material";

function App() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Stack
        sx={{
          position: "relative",
          overflow: "auto",
          width: "100%",
          height: "100%",
        }}
      >
        <CssBaseline />
        <LoginHeader />
        <ContentContainer />
      </Stack>
    </ThemeProvider>
  );
}

export default App;
