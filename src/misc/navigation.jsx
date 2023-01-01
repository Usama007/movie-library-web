import { Route, Routes } from "react-router-dom";
import Favorites from "../pages/Favorites";
import Home from "../pages/Home";
import MovieDetail from "../pages/MovieDetail";
import MovieList from "../pages/MovieList";
import ViewMore from "../pages/ViewMore";

export default function Navigation() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/movie-detail/:id" element={<MovieDetail />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/movies/:id" element={<ViewMore />} />
      <Route path="/movie-list" element={<MovieList />} />
    </Routes>
  );
}
