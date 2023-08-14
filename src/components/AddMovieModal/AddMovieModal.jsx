import { useContext, useState } from "react";
import { v4 as uuid } from "uuid";

import { DataContext } from "../../contexts/DataContext";
import "./AddMovieModal.css";

export default function AddMovieModal({ setShowAddMovie }) {
  const [userInput, setUserInput] = useState({
    title: "",
    summary: "",
    year: "",
    cast: [],
    genre: [],
    rating: "",
    director: "",
    writer: "",
    imageURL:
      "https://source.unsplash.com/random/200x200?sig=incrementingIdentifier",
  });
  const [errorMessage, setErrorMessage] = useState(false);

  const { dataDispatch } = useContext(DataContext);

  const handleFieldInput = (e) => {
    const field = e.target.id;
    if (field === "cast" || field === "genre") {
      setUserInput((prev) => ({ ...prev, [field]: e.target.value.split(",") }));
    } else {
      if (field === "year" || field === "rating") {
        setUserInput((prev) => ({
          ...prev,
          [field]: parseInt(e.target.value),
        }));
      } else {
        setUserInput((prev) => ({ ...prev, [field]: e.target.value }));
      }
    }
  };

  const validateField = (field) => {
    if (`${userInput[field]}`.trim() === "") {
      setErrorMessage(
        `Please enter the ${field !== "imageURL" ? field : "image URL"}!`
      );
      return false;
    } else {
      if (field === "year") {
        if (
          parseInt(userInput[field]) < 1990 ||
          parseInt(userInput[field]) > 2023
        ) {
          setErrorMessage("Year should be between 1990 to 2023");
          return false;
        }
      } else if (field === "rating") {
        if (parseInt(userInput[field]) < 1 || parseInt(userInput[field]) > 10) {
          setErrorMessage("Rating should be between 1 to 10");
          return false;
        }
      }
      return true;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.keys(userInput).every((field) =>
      validateField(field)
    );
    if (isValid) {
      setErrorMessage("");
      dataDispatch({
        type: "add-to-movies",
        payload: { id: uuid(), ...userInput },
      });
      setShowAddMovie(false);
    }
  };

  console.log({ userInput });
  return (
    <div className="modal-container">
      <form className="add-movie-form" onSubmit={handleFormSubmit}>
        {errorMessage && <p>{errorMessage}</p>}

        <label htmlFor="title">Title:</label>
        <input type="text" id="title" onChange={handleFieldInput} />

        <label htmlFor="summary">Summary:</label>
        <input type="text" id="summary" onChange={handleFieldInput} />

        <label htmlFor="year">Year:</label>
        <input type="number" id="year" onChange={handleFieldInput} />

        <label htmlFor="cast">Cast:</label>
        <input type="text" id="cast" onChange={handleFieldInput} />

        <div>Note: input multiple casts by using commas.</div>

        <label htmlFor="genre">Genre:</label>
        <input type="text" id="genre" onChange={handleFieldInput} />

        <div>Note: input multiple genres by using commas.</div>

        <label htmlFor="rating">Rating:</label>
        <input type="number" id="rating" onChange={handleFieldInput} />

        <label htmlFor="director">Director:</label>
        <input type="text" id="director" onChange={handleFieldInput} />

        <label htmlFor="writer">Writer:</label>
        <input type="text" id="writer" onChange={handleFieldInput} />

        <label htmlFor="imageURL">Image URL:</label>
        <input
          type="text"
          id="imageURL"
          value={userInput.imageURL}
          onChange={handleFieldInput}
        />

        <input className="btn white-border" type="submit" value="Add Movie" />
        <i
          class="fa-regular fa-circle-xmark close-icon pointer"
          onClick={() => setShowAddMovie(false)}
        ></i>
      </form>
    </div>
  );
}
