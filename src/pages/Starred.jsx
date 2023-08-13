import { useContext } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import { DataContext } from "../contexts/DataContext";
import "./Pages.css";

export default function Starred() {
  const {
    dataState: { starred },
  } = useContext(DataContext);

  return (
    <div className="page">
      <h1>Starred Movies</h1>
      <div className="movie-listing">
        {starred.map((movie) => (
          <MovieCard key={movie.id} movie={movie} starCard />
        ))}
      </div>
    </div>
  );
}
