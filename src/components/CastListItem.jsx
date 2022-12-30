import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  IconButton,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { API_IMAGE_URL } from "../misc/config";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

export default function CastListItem({ data }) {
  const navigate = useNavigate();
  return (
    <ImageListItem key={data.name} sx={{cursor:'pointer'}}>
      <img
        src={API_IMAGE_URL + "w400" + data?.profile_path}
        srcSet={API_IMAGE_URL + "w400" + data?.profile_path}
        alt={data.name}
        loading="lazy"
        style={{ borderRadius: 20 }}
      />

      <ImageListItemBar
        title={data.character}
        subtitle={data.original_name}
        sx={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
      />
    </ImageListItem>
  );
}
