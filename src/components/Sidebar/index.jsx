import { useTheme } from "@emotion/react";
import { ArrowDropDown, Favorite, Home } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import {
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../misc/api";
import { API_KEY } from "../../misc/config";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Sidebar({
  drawerWidth,
  open,
  DrawerHeader,
  handleDrawerClose,
}) {
  const theme = useTheme();
  const [genreList, setgenreList] = useState([]);
  const navigate = useNavigate();
  const [selectedGenre, setselectedGenre] = useState("");
  const [isCollapsed, setisCollapsed] = useState(true);

  useEffect(() => {
    if (open) {
      getGenres();
    }
    return () => {};
  }, [open]);

  const getGenres = async () => {
    // setloading(true);
    let response = await api.get("genre/movie/list", {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });

    if (response?.status === 200) {
      setgenreList(response?.data?.genres);
    } else {
    }
  };

  const getMovieList = async (genre_name) => {
    // setloading(true);
    let response = await api.get("search/movie", {
      params: {
        query: genre_name,
        page: 1,
        api_key: API_KEY,
        language: "en-US",
      },
    });

    if (response?.status === 200) {
      // setgenreList(response?.data?.genres);
      setselectedGenre(genre_name);
      navigate("/movie-list", {
        state: {
          movies: response?.data?.results,
          headerText: genre_name,
        },
      });
    } else {
    }
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem
          sx={{ cursor: "pointer", justifyContent: "space-between" }}
          onClick={() => navigate("/")}
        >
          <Home />
          <Typography variant="h5">Home</Typography>
          <ChevronRightIcon />
        </ListItem>
        <Divider />
        <ListItem
          sx={{ cursor: "pointer", justifyContent: "space-between" }}
          onClick={() => navigate("/favorites")}
        >
          <Favorite />
          <Typography variant="h5">Favorites</Typography>
          <ChevronRightIcon />
        </ListItem>
        <Divider />
        <ListItem
          sx={{ cursor: "pointer", justifyContent: "space-between" }}
          onClick={() => setisCollapsed(!isCollapsed)}
        >
          <MusicNoteIcon />
          <Typography variant="h5">GENRES</Typography>
          <ArrowDropDown />
        </ListItem>
      </List>
      <Divider />
      <Collapse in={isCollapsed}>
        <List>
          {genreList.map((item, index) => (
            <ListItem
              key={item?.id}
              disablePadding
              selected={item?.name === selectedGenre}
            >
              <ListItemButton onClick={() => getMovieList(item?.name)}>
                <ListItemText primary={item?.name} />
                <ChevronRightIcon />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Drawer>
  );
}
