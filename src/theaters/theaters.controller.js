const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  created_at: ["movies", null, "created_at"],
  updated_at: ["movies", null, "updated_at"],
  is_showing: ["movies", null, "is_showing"],
  theater_id: ["movies", null, "theater_id"],
});

// Route handlers
const list = async (req, res) => {
  const movies = await theatersService.list("movies");
    const theaters = await theatersService.list("theaters");
  const reducedMovies = reduceMovies(movies);
  for (let i = 0; i < reducedMovies.length; i++) {
    let movieArray = Object.values(reducedMovies[i])[0];
    let theater_id = Object.values(reducedMovies[i])[0][i].theater_id;
    if (theaters[i].theater_id === theater_id) {
      theaters[i].movies = movieArray;
    };
  };
  res.json({ data: theaters });
};

module.exports = {
  list: asyncErrorBoundary(list),
};