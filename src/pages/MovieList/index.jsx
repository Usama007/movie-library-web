import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import MovieListItem from "../../components/MovieListItem";

export default function MovieList() {
  const {
    state: { movies, headerText },
  } = useLocation();

  return (
    <Container maxWidth={false}>
      <Typography variant="h2" gutterBottom>
        {headerText}
      </Typography>
      <Grid container spacing={2} mb={5}>
        {movies?.map((item) => {
          if (item?.poster_path) {
            return (
              <Grid item lg={2} md={3} sm={4} xs={6} key={item?.id}>
                <MovieListItem data={item} />
              </Grid>
            );
          }
        })}
        {/* {movies?.map((item) => (
          <>
            {item?.poster_path && (
              <Grid item lg={2} md={3} sm={4} xs={6} >
                <MovieListItem data={item} key={item?.id} />
              </Grid>
            )}
          </>
        ))} */}
      </Grid>
    </Container>
  );
}
