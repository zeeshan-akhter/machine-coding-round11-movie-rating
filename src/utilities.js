export const inWatchList = (movieId, watchlist) =>
  watchlist.some(({ id }) => id === movieId);

export const inStarred = (movieId, starred) =>
  starred.some(({ id }) => id === movieId);

export const addToStarred = (dataDispatch, movie) => {
  dataDispatch({ type: "add-to-starred", payload: movie });
};

export const removeFromStarred = (dataDispatch, movie) => {
  dataDispatch({ type: "remove-from-starred", payload: movie });
};

export const addToWatchlist = (dataDispatch, movie) => {
  dataDispatch({ type: "add-to-watchlist", payload: movie });
};

export const removeFromWatchlist = (dataDispatch, movie) => {
  dataDispatch({ type: "remove-from-watchlist", payload: movie });
};
