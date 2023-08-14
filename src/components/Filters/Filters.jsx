import { useContext, useState } from "react";

import { DataContext } from "../../contexts/DataContext";
import AddMovieModal from "../AddMovieModal/AddMovieModal";
import "./Filters.css";

export default function Filters({ filters, setFilters }) {
  const [showAddMovie, setShowAddMovie] = useState(false);
  const {
    dataState: { movies },
  } = useContext(DataContext);

  const { genre, year, rating } = filters;

  let { ratings, years, genres } = movies.reduce(
    (accumulator, { year, rating, genre }) => {
      let acc = accumulator;
      if (!acc.years.includes(year)) {
        acc = { ...acc, years: [...acc.years, year] };
      }
      if (!acc.ratings.includes(rating)) {
        acc = { ...acc, ratings: [...acc.ratings, rating] };
      }
      genre.forEach((genre) => {
        if (!acc.genres.includes(genre)) {
          acc = { ...acc, genres: [...acc.genres, genre] };
        }
      });
      return acc;
    },
    { ratings: [], years: [], genres: [] }
  );

  genres = ["All genres", ...genres];
  years = ["Release Year", ...years];
  ratings = ["Rating", ...ratings];

  const handleFieldChange = (e) => {
    const field = e.target.id;
    setFilters((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <section className="filters-container">
      <h2>Movies</h2>
      <select id="genre" value={genre} onChange={handleFieldChange}>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <select id="year" value={year} onChange={handleFieldChange}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select id="rating" value={rating} onChange={handleFieldChange}>
        {ratings.map((rating) => (
          <option key={rating} value={rating}>
            {rating}
          </option>
        ))}
      </select>
      <button className="btn" onClick={() => setShowAddMovie(true)}>
        Add a Movie
      </button>
      {showAddMovie && <AddMovieModal setShowAddMovie={setShowAddMovie} />}
    </section>
  );
}
