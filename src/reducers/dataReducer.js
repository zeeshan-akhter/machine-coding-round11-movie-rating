export const dataReducer = (state, action) => {
  switch (action.type) {
    case "set-data-state":
      return action.payload;
    case "add-to-starred":
      return { ...state, starred: [...state.starred, action.payload] };
    case "remove-from-starred":
      return {
        ...state,
        starred: [
          ...state.starred.filter(({ id }) => id !== action.payload.id),
        ],
      };
    case "add-to-watchlist":
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case "remove-from-watchlist":
      return {
        ...state,
        watchlist: [
          ...state.watchlist.filter(({ id }) => id !== action.payload.id),
        ],
      };
    default:
      return state;
  }
};
