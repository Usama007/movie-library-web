import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router-dom";
import MovieListItem from "../../components/MovieListItem";
import api from "../../misc/api";
import { API_KEY } from "../../misc/config";

export default function ViewMore() {
  const [movies, setmovies] = useState([]);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (id === "Popular") {
        getPopularMovieList();
      } else if (id === "Top Rated") {
        getTopRatedMovieList();
      } else {
        getUpComingMovieList();
      }
    }
  }, [page]);

  const getPopularMovieList = async () => {
    setloading(true);
    let response = await api.get("movie/popular", {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: page,
      },
    });

    if (response?.status === 200) {
      setmovies((movie) => [...movie, ...response?.data?.results]);
      setloading(false);
    } else {
      setloading(false);
    }
  };

  const getTopRatedMovieList = async () => {
    setloading(true);
    let response = await api.get("movie/top_rated", {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: page,
      },
    });

    if (response?.status === 200) {
      setmovies((movie) => [...movie, ...response?.data?.results]);
      setloading(false);
    } else {
      setloading(false);
    }
  };

  const getUpComingMovieList = async () => {
    setloading(true);
    let response = await api.get("movie/upcoming", {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: page,
      },
    });

    if (response?.status === 200) {
      setmovies((movie) => [...movie, ...response?.data?.results]);
      setloading(false);
    } else {
      setloading(false);
    }
  };

  return (
    <Container maxWidth={false}>
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        sx={{
          textTransform: "uppercase",
          fontSize: { xs: 30, lg: 50, md: 40, sm: 40 },
        }}
      >
        {id} Movies
      </Typography>
      <InfiniteScroll
        dataLength={movies.length}
        next={() => setpage((page) => page + 1)}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        refreshFunction={() => setpage(1)}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        }
      >
        <Grid container spacing={2}>
          {movies?.map((item, index) => (
            <Grid
              item
              lg={2}
              md={3}
              sm={4}
              xs={6}
              key={"popular_" + item?.id + index}
            >
              <MovieListItem data={item} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
}
