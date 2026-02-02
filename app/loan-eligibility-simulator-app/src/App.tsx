import { AppBar, Box, Container, Stack, Toolbar } from "@mui/material";
import "./App.css";
import LoansPage from "./pages/Loan";

import logo from "./assets/logo_name.png";
import useUtilities from "./hooks/useUtilities";

function App() {
  const { isMobile, isTablet } = useUtilities();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src={logo} alt="logo" height={40} />
          </Toolbar>
        </Container>
      </AppBar>
      <Stack
        sx={{ background: "#f2f2f2", height: "100vh" }}
        paddingY={5}
        paddingX={isMobile || isTablet ? 2 : 10}
      >
        <LoansPage />
      </Stack>
    </Box>
  );
}

export default App;
