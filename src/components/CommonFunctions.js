import { Grid, Skeleton } from "@mui/material";

export const generateSkeleton = (name) => {
  let placeholderArray = [];

  for (let a = 0; a <= 5; a++) {
    placeholderArray = [
      ...placeholderArray,
      <Skeleton
        variant="rectangular"
        width={280}
        key={name + a}
        height={320}
        sx={{ borderRadius: 5 }}
      />,
    ];
  }

  return placeholderArray;
};

export const generateDetailSkeleton = () => {
  return (
    <Grid container>
      <Grid item lg={12} >
        <Skeleton variant="text" width={340} height={80} />
      </Grid>
      <Grid item lg={12}>
        <Grid container spacing={2}>
          <Grid item lg={3} md={3} sm={6} xs={6} >
            <Skeleton variant="rectangular" width={250} height={340} />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={6}  alignSelf={"center"}>
            <Skeleton variant="text" width={340} height={40} />
            <Skeleton variant="text" width={340} height={40} />
            <Skeleton variant="text" width={340} height={40} />
            <Skeleton variant="text" width={340} height={40} />
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12} >
            <Skeleton variant="rectangular" width={550} height={340} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
