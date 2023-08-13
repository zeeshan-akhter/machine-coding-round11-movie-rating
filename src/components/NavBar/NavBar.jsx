import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";

export default function NavBar({ setSearchInput }) {
  const navigate = useNavigate();

  return (
    <nav className="nav-bar">
      <h1 className="pointer" onClick={() => navigate("/")}>
        IMDB
      </h1>
      <SearchBar setSearchInput={setSearchInput} />
      <div className="links-container">
        <Link className="links" to="/">
          Movies
        </Link>
        <Link className="links" to="/watchlist">
          Watch List
        </Link>
        <Link className="links" to="/starred">
          Starred Movies
        </Link>
      </div>
    </nav>
  );
}
