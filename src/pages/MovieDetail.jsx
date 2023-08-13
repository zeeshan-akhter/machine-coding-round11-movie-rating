import { useContext } from "react";
import { useParams } from "react-router-dom";
import DetailCard from "../components/DetailCard/DetailCard";

import { DataContext } from "../contexts/DataContext";

import "./Pages.css";

export default function MovieDetail() {
  const { movieId } = useParams();

  const {
    dataState: { movies },
  } = useContext(DataContext);

  const movie = movies.find(({ id }) => id === movieId);

  return <div className="page">{<DetailCard movie={movie} />}</div>;
}
