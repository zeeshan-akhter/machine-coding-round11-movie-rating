import { useContext } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import { DataContext } from "../contexts/DataContext";
import "./Pages.css";

export default function Watchlist() {
  const {
    dataState: { watchlist },
  } = useContext(DataContext);

  return (
    <div className="page">
      <h1>Watch List</h1>
      <div className="movie-listing">
        {watchlist.map((movie) => (
          <MovieCard key={movie.id} movie={movie} watchlistCard />
        ))}
      </div>
    </div>
  );
}
