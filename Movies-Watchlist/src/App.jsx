import { useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  function addMovie(event) {
    event.preventDefault();

    if (title.trim() === "") {
      return;
    }

    const newMovie = {
      id: Date.now(),
      title: title.trim(),
      review: review.trim(),
      rating: Number(rating),
    };

    setMovies([...movies, newMovie]);

    setTitle("");
    setReview("");
    setRating(5);
  }

  function removeMovie(id) {
    setMovies(
      movies.filter(function (movie) {
        return movie.id !== id;
      })
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>My Movies</h1>
        <p>Keep track of the movies you watch!</p>
      </header>

      <form className="movie-form" onSubmit={addMovie}>
        <h2>Add a Movie</h2>

        <label htmlFor="title">Movie Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter movie title"
          value={title}
          onChange={function (event) {
            setTitle(event.target.value);
          }}
        />

        <label htmlFor="review">Your Review</label>
        <textarea
          id="review"
          placeholder="What did you think of the movie?"
          value={review}
          onChange={function (event) {
            setReview(event.target.value);
          }}
        />

        <label htmlFor="rating">Your Rating</label>
        <select
          id="rating"
          value={rating}
          onChange={function (event) {
            setRating(event.target.value);
          }}
        >
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>

        <button type="submit">Add Movie</button>
      </form>

      <section className="movies-section">
        <h2>My Watch List ({movies.length})</h2>

        {movies.length === 0 ? (
          <p className="empty-message">
            No movies yet. Add your first movie!
          </p>
        ) : (
          <div className="movie-list">
            {movies.map(function (movie) {
              return (
                <div className="movie-card" key={movie.id}>
                  <div className="movie-heading">
                    <h3>{movie.title}</h3>

                    <button
                      className="remove-button"
                      onClick={function () {
                        removeMovie(movie.id);
                      }}
                    >
                      Remove
                    </button>
                  </div>

                  <p className="stars">
                    {"⭐".repeat(movie.rating)}
                  </p>

                  <p>
                    <strong>Rating:</strong> {movie.rating}/5
                  </p>

                  <p>
                    <strong>Review:</strong>{" "}
                    {movie.review || "No review added."}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;