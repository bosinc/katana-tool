import LoginHeader from "./components/LoginHeader.tsx";
import ContentContainer from "./components/ContentContainer.tsx";
import { CssBaseline, Stack } from "@mui/material";

function App() {
  return (
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
  );
}

export default App;
