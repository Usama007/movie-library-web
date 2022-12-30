import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { API_IMAGE_URL } from "../misc/config";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

export default function MovieListItem({ data, height }) {
  const navigate = useNavigate();
  return (
      <Card
        sx={{ borderRadius: 5 ,cursor:'pointer'}}
        onClick={() => {
          navigate("/movie-detail/" + data?.id);
        }}
      >
        <CardMedia
          component="img"
          sx={
            height ? { borderRadius: 5, height: height } : { borderRadius: 5 }
          }
          image={API_IMAGE_URL + "w400" + data?.poster_path}
          alt="Paella dish"
        />
      </Card>
  );
}
