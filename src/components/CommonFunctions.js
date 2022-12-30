import { Skeleton } from "@mui/material";
import { useCallback } from "react";

export const generateSkeleton = (name) => {
  let placeholderArray = [];

  for (let a = 0; a <= 5; a++) {
    placeholderArray = [
      ...placeholderArray,
      <Skeleton
        variant="rectangular"
        width={250}
        key={name + a}
        height={340}
        sx={{ borderRadius: 5 }}
      />,
    ];
  }

  return placeholderArray;
};


