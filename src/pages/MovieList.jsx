import { useContext, useEffect, useRef, useState } from "react";

import Filters from "../components/Filters/Filters";
import MovieCard from "../components/MovieCard/MovieCard";
import { DataContext } from "../contexts/DataContext";
import "./Pages.css";

export default function MovieList({ searchInput }) {
  const {
    dataState: { movies },
  } = useContext(DataContext);

  const [filters, setFilters] = useState({
    genre: "All genres",
    year: "Release Year",
    rating: "Rating",
  });

  let filteredMovies = movies;

  const matchString = (stringToMatch, searchInput) => {
    return stringToMatch.toLowerCase().includes(searchInput.toLowerCase());
  };

  if (searchInput !== "") {
    filteredMovies = filteredMovies.filter(
      ({ title, cast, director }) =>
        matchString(title, searchInput) ||
        matchString(director, searchInput) ||
        cast.some((name) => matchString(name, searchInput))
    );
  }

  // filters

  const { genre, year, rating } = filters;

  if (genre !== "All genres") {
    filteredMovies = filteredMovies.filter(({ genre: genreArr }) =>
      genreArr.includes(genre)
    );
  }

  if (year !== "Release Year") {
    filteredMovies = filteredMovies.filter(
      ({ year: yearToCheck }) => yearToCheck === parseInt(year)
    );
  }

  if (rating !== "Rating") {
    filteredMovies = filteredMovies.filter(
      ({ rating: ratingToCheck }) => ratingToCheck === parseInt(rating)
    );
  }

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      const filtersInLocalStorage = JSON.parse(localStorage.getItem("filters"));
      if (filtersInLocalStorage) {
        setFilters(filtersInLocalStorage);
      }
      firstRender.current = false;
    } else {
      localStorage.setItem("filters", JSON.stringify(filters));
    }
  }, [filters]);

  return (
    <div className="page ">
      <Filters filters={filters} setFilters={setFilters} />
      <section className="movie-listing">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
      {filteredMovies.length === 0 && <h1>Sorry, no movies to show!</h1>}
    </div>
  );
}