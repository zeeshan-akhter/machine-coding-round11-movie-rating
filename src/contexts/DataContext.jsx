import { createContext, useEffect, useReducer, useRef } from "react";

import { movies } from "../data";
import { dataReducer } from "../reducers/dataReducer";

export const DataContext = createContext();

const initialDataState = { movies: movies, watchlist: [], starred: [] };

export function DataProvider({ children }) {
  const [dataState, dataDispatch] = useReducer(dataReducer, initialDataState);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      const dataInLocalStorage = JSON.parse(localStorage.getItem("dataState"));
      if (dataInLocalStorage) {
        dataDispatch({ type: "set-data-state", payload: dataInLocalStorage });
      }
      firstRender.current = false;
    } else {
      localStorage.setItem("dataState", JSON.stringify(dataState));
    }
  }, [dataState]);
  return (
    <DataContext.Provider value={{ dataState, dataDispatch }}>
      {children}
    </DataContext.Provider>
  );
}
