import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateSkeleton } from "../../components/CommonFunctions";
import MovieListItem from "../../components/MovieListItem";
import ViewMoreBtn from "../../components/ViewMoreBtn";
import api from "../../misc/api";
import { API_KEY } from "../../misc/config";

export default function Home() {
  const navigate = useNavigate();
  const [popularMovieList, setpopularMovieList] = useState([]);
  const [topRatedMovieList, settopRatedMovieList] = useState([]);
  const [upcoomingMovieList, setupcoomingMovieList] = useState([]);
  const [loadingPopularMovies, setloadingPopularMovies] = useState(true);
  const [loadingTopRatedMovies, setloadingTopRatedMovies] = useState(true);
  const [loadingUpcomingMovies, setloadingUpcomingMovies] = useState(true);

  const getPopularMovieList = useCallback(async () => {
    setloadingPopularMovies(true);
    let movies = await api.get("movie/popular", {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });

    if (movies?.status === 200) {
      setpopularMovieList(movies?.data?.results);
      setloadingPopularMovies(false);
    } else {
      setloadingPopularMovies(false);
    }
  }, []);

  const getTopRatedMovieList = useCallback(async () => {
    setloadingTopRatedMovies(true);
    let movies = await api.get("movie/top_rated", {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });

    if (movies?.status === 200) {
      settopRatedMovieList(movies?.data?.results);
      setloadingTopRatedMovies(false);
    } else {
      setloadingTopRatedMovies(false);
    }
  }, []);

  const getUpcomingMovies = useCallback(async () => {
    setloadingUpcomingMovies(true);

    let movies = await api.get("movie/upcoming", {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });

    if (movies?.status === 200) {
      setupcoomingMovieList(movies?.data?.results);
      setloadingUpcomingMovies(false);
    } else {
      setloadingUpcomingMovies(false);
    }
  }, []);

  useEffect(() => {
    setpopularMovieList([]);
    settopRatedMovieList([]);
    setupcoomingMovieList([]);
    getPopularMovieList();
    getTopRatedMovieList();
    getUpcomingMovies();
    return () => {
      setpopularMovieList([]);
      settopRatedMovieList([]);
      setupcoomingMovieList([]);
    };
  }, [getPopularMovieList]);

  const goToViewMore = (param) => {
    navigate("/movies/" + param);
  };

  return (
    <Container maxWidth={false}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h4"
          sx={{ fontSize: { xs: 25, sm: 35 } }}
          gutterBottom
        >
          Popular Movies
        </Typography>
        {loadingPopularMovies ? (
          <Stack mb={5} direction="row" spacing={5}>
            {generateSkeleton("popular")}
          </Stack>
        ) : (
          <Grid container spacing={2} mb={5}>
            {popularMovieList?.map((item, index) => (
              <Grid
                item
                lg={2}
                md={3}
                sm={4}
                xs={6}
                key={"popular_" + item?.id + index}
              >
                {index + 1 === popularMovieList.length ? (
                  <ViewMoreBtn goToViewMore={() => goToViewMore("Popular")} />
                ) : (
                  <MovieListItem data={item} />
                )}
              </Grid>
            ))}
          </Grid>
        )}

        <Divider variant="fullWidth" />
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontSize: { xs: 25, sm: 35 } }}
          gutterBottom
        >
          Top Rated Movies
        </Typography>
        {loadingTopRatedMovies ? (
          <Stack mb={5} direction="row" spacing={5}>
            {generateSkeleton("topRated")}
          </Stack>
        ) : (
          <Grid container spacing={2} mb={5}>
            {topRatedMovieList?.map((item, index) => (
              <Grid
                item
                lg={2}
                md={3}
                sm={4}
                xs={6}
                key={"topRated" + item?.id + index}
              >
                {index + 1 === topRatedMovieList.length ? (
                  <ViewMoreBtn goToViewMore={() => goToViewMore("Top Rated")} />
                ) : (
                  <MovieListItem data={item} />
                )}
              </Grid>
            ))}
          </Grid>
        )}

        <Divider variant="fullWidth" />
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontSize: { xs: 25, sm: 35 } }}
          gutterBottom
        >
          Upcoming Movies
        </Typography>
        {loadingUpcomingMovies ? (
          <Stack mb={5} direction="row" spacing={5}>
            {generateSkeleton("upcoming")}
          </Stack>
        ) : (
          <Grid container spacing={2} mb={5}>
            {upcoomingMovieList?.map((item, index) => (
              <Grid
                item
                lg={2}
                md={3}
                sm={4}
                xs={6}
                key={"upcoming" + item?.id + index}
              >
                {index + 1 === upcoomingMovieList.length ? (
                  <ViewMoreBtn goToViewMore={() => goToViewMore("Upcoming")} />
                ) : (
                  <MovieListItem data={item} />
                )}
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
