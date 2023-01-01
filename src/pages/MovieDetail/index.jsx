import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Alert,
  Button,
  Chip,
  Container,
  Grid,
  Rating,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import CastListItem from "../../components/CastListItem";
import {
  generateDetailSkeleton,
  generateSkeleton,
} from "../../components/CommonFunctions";
import MovieListItem from "../../components/MovieListItem";
import api from "../../misc/api";
import { API_IMAGE_URL, API_KEY } from "../../misc/config";
import { addToFavorite, removeFromFavorite } from "../../redux/favSlice";
import "./style.css";

export default function MovieDetail() {
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.fav.favorites);
  const dispatch = useDispatch();
  const [showSnackbar, setshowSnackbar] = useState(false);
  const [snackbarMessage, setsnackbarMessage] = useState("");
  const [data, setdata] = useState({});
  const [videoArray, setvideoArray] = useState([]);
  const [creditArray, setcreditArray] = useState([]);
  const [similarMovies, setsimilarMovies] = useState([]);
  const [castLoading, setcastLoading] = useState(false);
  const [movieDetailLoading, setmovieDetailLoading] = useState(false);
  const [similarMoviesLoading, setsimilarMoviesLoading] = useState(false);
  const [addedToFav, setaddedToFav] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    setvideoArray([]);
    setcreditArray([]);
    setsimilarMovies([]);
    setcastLoading(false);
    setmovieDetailLoading(false);
    setsimilarMoviesLoading(false);
    setaddedToFav(false);
    getMovieDetail();
    return () => {};
  }, [id]);

  useEffect(() => {
    let index = favorites?.findIndex((item) => item?.id == id);
    if (index > -1) {
      setaddedToFav(true);
    } else {
      setaddedToFav(false);
    }
    return () => {};
  }, [favorites]);

  const getMovieDetail = async () => {
    setmovieDetailLoading(true);
    setcastLoading(true);
    setsimilarMoviesLoading(true);
    let response = await api.get("movie/" + id, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });
    let videoResponse = await api.get("movie/" + id + "/videos", {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });

    let creditResponse = await api.get("movie/" + id + "/credits", {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });

    let similarMoviesResponse = await api.get("movie/" + id + "/similar", {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });

    if (response?.status === 200) {
      setdata(response?.data);
      setmovieDetailLoading(false);
    } else {
      setmovieDetailLoading(false);
    }

    if (videoResponse?.status === 200) {
      // console.log(videoResponse?.data);
      setvideoArray(videoResponse?.data?.results);
    } else {
    }

    if (creditResponse?.status === 200) {
      setcreditArray(creditResponse?.data);
      setcastLoading(false);
    } else {
      setcastLoading(false);
    }

    if (similarMoviesResponse?.status === 200) {
      setsimilarMovies(similarMoviesResponse?.data?.results);
      setsimilarMoviesLoading(false);
    } else {
      setsimilarMoviesLoading(false);
    }
  };

  return (
    <Container maxWidth={"true"}>
      {movieDetailLoading ? (
        generateDetailSkeleton()
      ) : (
        <Grid container>
          <Grid item lg={12}>
            <Typography variant="h4" gutterBottom className="text">
              {data?.original_title}
            </Typography>
          </Grid>
          <Grid item lg={12}>
            <Grid container>
              <Grid item lg={6}>
                <Grid container spacing={2} alignItems={"center"}>
                  <Grid item lg={6}>
                    <img
                      src={API_IMAGE_URL + "w300" + data?.poster_path}
                      width="100%"
                      alt=""
                      style={{ borderRadius: 30 }}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <Typography variant="h6" gutterBottom>
                      Release Date: {data?.release_date}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Run Time: {data?.runtime}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Rating
                        name="half-rating"
                        value={1}
                        max={1}
                        readOnly
                        sx={{ display: "flex", alignItems: "center" }}
                      />
                      <Typography variant="h6" gutterBottom>
                        {data?.vote_average?.toFixed(2)}/10
                      </Typography>
                    </Stack>

                    <Typography variant="h6" gutterBottom>
                      Popularity: {data?.popularity?.toFixed(0)}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      <Stack direction="row" spacing={0.1}>
                        {data?.spoken_languages?.map((item, index) => {
                          if (item?.english_name) {
                            return (
                              <Typography variant="body1" key={item?.iso_639_1}>
                                <strong>{index === 0 && "Languages: "} </strong>
                                {item?.english_name}{" "}
                                {index + 1 < data?.spoken_languages?.length &&
                                  ","}
                              </Typography>
                            );
                          }
                        })}

                        {/* {data?.spoken_languages?.map((item, index) => (
                          <>
                            {item?.english_name && (
                              <Typography variant="body1" key={item?.iso_639_1}>
                                <strong>{index === 0 && "Languages: "} </strong>
                                {item?.english_name}{" "}
                                {index + 1 < data?.spoken_languages?.length &&
                                  ","}
                              </Typography>
                            )}
                          </>
                        ))} */}
                      </Stack>
                    </Typography>

                    <Stack direction="row" spacing={1} mb={2}>
                      {data?.genres?.map((item) => (
                        <Chip label={item?.name} key={item?.id} />
                      ))}
                    </Stack>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      endIcon={
                        addedToFav ? <FavoriteIcon /> : <FavoriteBorderIcon />
                      }
                      onClick={() => {
                        if (addedToFav) {
                          dispatch(removeFromFavorite(data));
                          setsnackbarMessage("Removed from favorite");
                          setshowSnackbar(true);
                        } else {
                          dispatch(addToFavorite(data));
                          setsnackbarMessage("Added to favorite");
                          setshowSnackbar(true);
                        }
                      }}
                    >
                      {addedToFav ? "Added To Favorites" : "Add To Favorites"}
                    </Button>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item>
                    <Stack direction={"row"} spacing={0.2}>
                      <Typography>Director(s):</Typography>
                      {creditArray?.crew?.map((item, index) => (
                        <Typography
                          color={"primary"}
                          key={item?.id + "_" + index}
                        >
                          {item?.job === "Director" && <>{item?.name}</>}
                        </Typography>
                      ))}
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={6} mt={{ xs: 2 }}>
                <YouTube videoId={videoArray[0]?.key} />
                <Typography variant="h6">Overview </Typography>
                <Typography variant="h6"> {data?.overview} </Typography>
              </Grid>
            </Grid>
          </Grid>
          {creditArray?.cast?.length > 0 && (
            <Grid item lg={12} mt={5}>
              <Typography variant="h3" gutterBottom className="text">
                TOP CAST(s)
              </Typography>
              {castLoading ? (
                <Stack mb={5} direction="row" spacing={5}>
                  {generateSkeleton("cast")}
                </Stack>
              ) : (
                <Grid container spacing={2}>
                  {creditArray?.cast?.map((item, index) => {
                    if (index < 6 && item?.profile_path) {
                      return (
                        <Grid item lg={2} md={3} xs={4} sm={3} key={item?.id}>
                          <CastListItem data={item} />
                        </Grid>
                      );
                    } else {
                      return null;
                    }
                  })}
                </Grid>
              )}
            </Grid>
          )}
          {similarMovies?.length > 0 && (
            <Grid item lg={12} mt={5}>
              <Typography variant="h3" gutterBottom className="text">
                SIMILAR MOVIES
              </Typography>

              {similarMoviesLoading ? (
                <Stack mb={5} direction="row" spacing={5}>
                  {generateSkeleton("cast")}
                </Stack>
              ) : (
                <Grid container spacing={5}>
                  {similarMovies?.map((item, index) => {
                    if (index < 6 && item?.poster_path) {
                      return (
                        <Grid item lg={2} md={3} xs={4} sm={3} key={item?.id}>
                          <MovieListItem data={item} />
                        </Grid>
                      );
                    } else {
                      return null;
                    }
                  })}
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      )}

      <Snackbar
        open={showSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sev
        autoHideDuration={3000}
        onClose={() => {
          setsnackbarMessage("");
          setshowSnackbar(false);
        }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
