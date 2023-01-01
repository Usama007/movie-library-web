import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import Header from "./components/Header";
import Sidebar, { DrawerHeader } from "./components/Sidebar";
import Navigation from "./misc/navigation";


const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: 'RobotoBold, Arial',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'RobotoBold';
      }
      `
    }
  }
 
});

export default function App() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          drawerWidth={drawerWidth}
        />

        <Sidebar
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          drawerWidth={drawerWidth}
          DrawerHeader={DrawerHeader}
        />

        <Main open={open} >
          <DrawerHeader />
          <Box  sx={{
        fontFamily: 'RobotoBold',
      }}   mt={{ xs: 5, sm: 2, md: 0, lg: 0 }}>
          <Navigation />
          </Box>
        </Main>
      </Box>
    </ThemeProvider>
  );
}
