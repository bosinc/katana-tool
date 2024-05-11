import LoginHeader from "@components/LoginHeader.tsx";
import ContentContainer from "@components/ContentContainer.tsx";
import { CssBaseline, Stack, ThemeProvider, useTheme } from "@mui/material";

function App() {
  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack
        sx={{
          position: "relative",
          overflow: "auto",
          width: "100%",
          height: "100%",
          bgcolor: "#fff",
          borderRadius: 4,
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <LoginHeader />
        <ContentContainer />
      </Stack>
    </ThemeProvider>
  );
}

export default App;
