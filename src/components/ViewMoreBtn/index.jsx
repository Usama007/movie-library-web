import { ArrowOutward } from "@mui/icons-material";
import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

export default function ViewMoreBtn({goToViewMore}) {
  return (
    <Card
      onClick={goToViewMore}
      sx={{
        height: "100%",
        borderRadius: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        cursor:'pointer'
      }}
    >
      <CardContent>
        <ArrowOutward sx={{ fontSize: 50 }} />
        <Typography variant="h5">View More</Typography>
      </CardContent>
    </Card>
  );
}
