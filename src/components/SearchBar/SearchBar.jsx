import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

export default function SearchBar({ setSearchInput }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setTimeout(() => {
      navigate("/");
    }, 200);

    setSearchInput(e.target.value);
  };
  return (
    <input
      type="search"
      className="search-bar"
      placeholder="Search movies by title, cast and director..."
      onChange={handleSearch}
    />
  );
}
