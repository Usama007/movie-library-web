import { useTheme } from "@emotion/react";
import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { styled } from "@mui/material/styles";
import api from "../../misc/api";
import { API_KEY } from "../../misc/config";
import { useNavigate } from "react-router-dom";

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
  const [selectedGenre, setselectedGenre] = useState("")

  useEffect(() => {
    if (open) {
      getGenres();
    }
    return () => {};
  }, [open]);

  useEffect(() => {
    console.log(genreList);
  }, [genreList]);

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
      setselectedGenre(genre_name)
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
        <ListItem sx={{cursor:'pointer'}} onClick={() =>navigate('/') }>
          <Typography variant="h4">GENRES</Typography>
        </ListItem>
      </List>
      <Divider />
      <List>
        {genreList.map((item, index) => (
          <ListItem key={item?.id} disablePadding selected= {item?.name === selectedGenre}>
            <ListItemButton onClick={() => getMovieList(item?.name)}>
              <ListItemText primary={item?.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
