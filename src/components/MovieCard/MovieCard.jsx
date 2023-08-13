import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../contexts/DataContext";
import {
  addToStarred,
  addToWatchlist,
  inStarred,
  inWatchList,
  removeFromStarred,
  removeFromWatchlist,
} from "../../utilities";
import "./MovieCard.css";

export default function MovieCard({ movie, starCard, watchlistCard }) {
  const { id, title, summary, imageURL } = movie;

  const {
    dataState: { starred, watchlist },
    dataDispatch,
  } = useContext(DataContext);

  const navigate = useNavigate();

  return (
    <article
      className="movie-card pointer"
      onClick={() => navigate(`/moviedetail/${id}`)}
    >
      <img src={imageURL} alt="movie" />
      <div className="info">
        <h1>{title}</h1>
        <p>{summary}</p>
        <div className="btn-container">
          {!watchlistCard && (
            <>
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
                  {!starCard ? "Starred" : "Unstar"}
                </button>
              )}
            </>
          )}
          {!starCard && (
            <>
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
                  {!watchlistCard
                    ? "Added to WatchList"
                    : "Remove from watch list"}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
}
