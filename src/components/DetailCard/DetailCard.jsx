import { useContext } from "react";

import { DataContext } from "../../contexts/DataContext";
import {
  addToStarred,
  addToWatchlist,
  inStarred,
  inWatchList,
  removeFromStarred,
  removeFromWatchlist,
} from "../../utilities";
import "./DetailCard.css";

export default function DetailCard({ movie }) {
  const {
    title,
    year,
    genre,
    rating,
    director,
    writer,
    cast,
    summary,
    imageURL,
  } = movie ?? {};

  const {
    dataState: { starred, watchlist },
    dataDispatch,
  } = useContext(DataContext);

  if (movie) {
    return (
      <article className="detail-card">
        <img src={imageURL} alt="movie" />
        <section>
          <h1>{title}</h1>
          <p>{summary}</p>
          <p>Year : {year}</p>
          <p>Genre : {genre.join(", ")}</p>
          <p>Rating : {rating}</p>
          <p>Director : {director}</p>
          <p>Writer : {writer}</p>
          <p>Cast : {cast.join(", ")}</p>

          <div className="btn-container">
            {" "}
            {!inStarred(movie.id, starred) ? (
              <button
                className="btn"
                onClick={(e) => {
                  e.stopPropagation();
                  addToStarred(dataDispatch, movie);
                }}
              >
                Star
              </button>
            ) : (
              <button
                className="btn"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromStarred(dataDispatch, movie);
                }}
              >
                Starred
              </button>
            )}
            {!inWatchList(movie.id, watchlist) ? (
              <button
                className="btn"
                onClick={(e) => {
                  e.stopPropagation();
                  addToWatchlist(dataDispatch, movie);
                }}
              >
                Add to WatchList
              </button>
            ) : (
              <button
                className="btn"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWatchlist(dataDispatch, movie);
                }}
              >
                Added to WatchList
              </button>
            )}
          </div>
        </section>
      </article>
    );
  } else {
    return <div>Something went wrong!</div>;
  }
}
