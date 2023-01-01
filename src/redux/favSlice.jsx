import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

export const favSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      state.favorites.push(action?.payload);
    },
    removeFromFavorite: (state, action) => {
      let index = state.favorites.findIndex((item) => {
        return item.id === action.payload.id;
      });
      state.favorites.splice(index, 1);
      //   state.value -= 1;
      //   return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToFavorite, removeFromFavorite } = favSlice.actions;

export default favSlice.reducer;
