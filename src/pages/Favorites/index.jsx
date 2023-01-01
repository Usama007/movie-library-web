import { DeleteOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_IMAGE_URL } from "../../misc/config";
import { removeFromFavorite } from "../../redux/favSlice";
import "./style.css";

export default function Favorites() {
  const favorites = useSelector((state) => state?.fav?.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(favorites);
    return () => {};
  }, [favorites]);

  return (
    <Grid container spacing={6}>
      {favorites?.map((item, index) => (
        <Grid item lg={3} md={3} sm={6} xs={12} key={item?.id}>
          <Card
            sx={{ borderRadius: 5 }}
            onClick={() => {
              navigate("/movie-detail/" + item?.id);
            }}
          >
            <CardMedia
              component="img"
              height={{ xs: 150, lg: 400 }}
              image={API_IMAGE_URL + "w300" + item?.poster_path}
              alt="Paella dish"
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" gutterBottom className="movieTitle">
                {item?.original_title}
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  dispatch(removeFromFavorite(item));
                }}
              >
                Remove From Fav <DeleteOutlined sx={{ marginLeft: 2 }} />
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
