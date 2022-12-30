import {
  Alert,
  Autocomplete,
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import InputBase from "@mui/material/InputBase";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import api from "../../misc/api";
import { API_KEY } from "../../misc/config";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header({ open, handleDrawerOpen, drawerWidth }) {
  const navigate = useNavigate();

  const [searchedText, setsearchedText] = React.useState(null);
  const [openSnackbar, setopenSnackbar] = React.useState(false);
  const [snackbarMessage, setsnackbarMessage] = React.useState("");

  React.useEffect(() => {
    if (searchedText) {
      getMovieList();
    }
  }, [searchedText]);

  const getMovieList = async () => {
    // setloadingPopularMovies(true);
    let movies = await api.get("/search/movie", {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
        query: searchedText,
      },
    });

    if (movies?.status === 200) {
      // setmovieList(movies?.data?.results);
      if (movies?.data?.results?.length > 0) {
        navigate("movie-list", {
          state: {
            movies: movies?.data?.results,
            api_url: "/search/movie",
            headerText: `Search result of: ${searchedText}`,
          },
        });
      } else {
        setsnackbarMessage("No Movie Found!");
        setopenSnackbar(true);
      }

      // setloadingPopularMovies(false);
    } else {
      // setloadingPopularMovies(false);
    }
  };

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ flexGrow: 1 }}>
          <Stack
            sx={{ flexGrow: 1 }}
            direction="row"
            justifyContent={"space-between"}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              Movie Library
            </Typography>
            <Search onenter>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                onKeyDown={(e) => {
                  if (e?.key === "Enter") {
                    setsearchedText(e.target.value);
                  }
                }}
                // onInput={()=>console.log(21313)}

                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Stack>
        </Toolbar>
      </AppBar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        onClose={() => setopenSnackbar(false)}
        message="I love snacks"
        autoHideDuration={3000}

        // key={vertical + horizontal}
      >
        <Alert severity="error">{snackbarMessage}</Alert>
      </Snackbar>
    </>
  );
}
