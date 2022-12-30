import { Image } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import HorizontalScroll from "react-horizontal-scrolling";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSnapCarousel } from "react-snap-carousel";
import YouTube from "react-youtube";
import CastListItem from "../../components/CastListItem";
import MovieListItem from "../../components/MovieListItem";
import api from "../../misc/api";
import { API_IMAGE_URL, API_KEY } from "../../misc/config";
import "./style.css";

const styles = {
  root: {},
  scroll: {
    position: "relative",
    display: "flex",
    overflow: "auto",
    scrollSnapType: "x mandatory",
  },
  item: {
    width: "250px",
    height: "250px",
    flexShrink: 0,
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  nextPrevButton: {},
  nextPrevButtonDisabled: { opacity: 0.3 },
  pagination: {
    display: "flex",
  },
  paginationButton: {
    margin: "10px",
  },
  paginationButtonActive: { opacity: 0.3 },
  pageIndicator: {
    display: "flex",
    justifyContent: "center",
  },
};

export default function MovieDetail() {
  const navigate = useNavigate()
  const [data, setdata] = useState({});
  const [videoArray, setvideoArray] = useState([]);
  const [creditArray, setcreditArray] = useState([]);
  const [similarMovies, setsimilarMovies] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    getMovieDetail();

    return () => {};
  }, [id]);

  const getMovieDetail = async () => {
    // setloading(true);
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
    } else {
    }

    if (videoResponse?.status === 200) {
      // console.log(videoResponse?.data);
      setvideoArray(videoResponse?.data?.results);
    } else {
    }

    if (creditResponse?.status === 200) {
      setcreditArray(creditResponse?.data);
    } else {
    }

    if (similarMoviesResponse?.status === 200) {
      setsimilarMovies(similarMoviesResponse?.data?.results);
    } else {
    }
  };



  return (
    <Container fixed maxWidth={false}>
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h3" gutterBottom className="text">
            {data?.original_title}
          </Typography>
        </Grid>
        <Grid
          item
          lg={2}
          xs={4}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img
            src={API_IMAGE_URL + "w300" + data?.poster_path}
            width="100%"
            alt=""
            style={{ borderRadius: 30 }}
          />
        </Grid>
        <Grid
          item
          lg={4}
          xs={8}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
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
          <Typography variant="h6">
            <Stack direction="row" spacing={1}>
              {data?.spoken_languages?.map((item, index) => (
                <Typography variant="h6" key={item?.iso_639_1}>
                  {index === 0 && "Languages: "} {item?.english_name}{" "}
                  {index + 1 < data?.spoken_languages?.length && ","}
                </Typography>
              ))}
            </Stack>
          </Typography>
          <Stack direction="row" spacing={0.2}>
            <Typography variant="h6" gutterBottom>
              {" "}
              Director(s):{" "}
            </Typography>
            {creditArray?.crew?.map((item, index) => (
              <Typography variant="h6" key={item?.id + "_" + index}>
                {item?.job === "Director" && <>{item?.name}</>}
              </Typography>
            ))}
          </Stack>

          <Stack direction="row">
            <Typography variant="subtitle1" gutterBottom>
              {" "}
              Star(s):{" "}
            </Typography>
            {creditArray?.cast?.map((item, index) => (
              <div key={item?.id + "_" + index}>
                {index < 3 && (
                  <Typography variant="subtitle1" sx={{ paddingRight: 1 }}>
                    {item?.name}
                    {index + 1 < 3 && ", "}
                  </Typography>
                )}
              </div>
            ))}
          </Stack>

          <Stack direction="row" spacing={1}>
            {data?.genres?.map((item) => (
              <Chip label={item?.name} key={item?.id} />
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          lg={5}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <YouTube videoId={videoArray[0]?.key} />
        </Grid>

        <Grid item lg={12}>
          <Typography variant="subtitle" gutterBottom>
            {data?.overview}
          </Typography>
        </Grid>
        <Grid item lg={12}>
          <Typography variant="h3" gutterBottom className="text">
            TOP CAST(s)
          </Typography>

          <Grid container spacing={2} justifyContent={"center"}>
            {creditArray?.cast?.map((item, index) => {
              if (index < 6 && item?.profile_path) {
                return (
                  <Grid item lg={2} xs={6} key={item?.id}>
                    <CastListItem data={item} />
                  </Grid>
                );
              } else {
                return null;
              }
            })}
          </Grid>
        </Grid>
        <Grid item lg={12}>
          <Typography variant="h3" gutterBottom className="text">
            SIMILAR MOVIES
          </Typography>

          <Grid container spacing={5}>
            {similarMovies?.map((item, index) => {
              if (index < 6 && item?.poster_path) {
                return (
                  <Grid item lg={2} xs={6} key={item?.id}>
                    <MovieListItem data={item}/>
                  </Grid>
                );
              } else {
                return null;
              }
            })}

            {/*            
              {similarMovies.map((item, index) => (
               
                <Grid item lg={2} key={item?.id + "_" + index}>
                  <MovieListItem data={item} height={250} />
                </Grid>
              ))}
           */}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
