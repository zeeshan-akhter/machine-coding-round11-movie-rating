import { useContext } from "react";

import { DataContext } from "../../contexts/DataContext";
import "./Filters.css";

export default function Filters({ filters, setFilters }) {
  const {
    dataState: { movies },
  } = useContext(DataContext);

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
      <select id="genre" onChange={handleFieldChange}>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <select id="year" onChange={handleFieldChange}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select id="rating" onChange={handleFieldChange}>
        {ratings.map((rating) => (
          <option key={rating} value={rating}>
            {rating}
          </option>
        ))}
      </select>
      <button className="btn">Add a Movie</button>
    </section>
  );
}