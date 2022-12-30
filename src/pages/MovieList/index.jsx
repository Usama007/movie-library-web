import { Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MovieListItem from "../../components/MovieListItem";

export default function MovieList() {
  const {
    state: {  movies, headerText },
  } = useLocation();




  return (
    <Container  fixed maxWidth={false}>
      <Typography variant="h2" gutterBottom>
        {headerText}
      </Typography>
      <Grid container spacing={2} mb={5}>
        {movies?.map((item) => (
          <>
            {item?.poster_path && (
              <Grid
                item
                lg={2}
                md={3}
                sm={6}
                xs={12}
                key={"search_" + item?.id}
              >
                <MovieListItem data={item} key={item?.id}/>
              </Grid>
            )}
          </>
        ))}
      </Grid>
    </Container>
  );
}
