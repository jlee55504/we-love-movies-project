const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

// Middleware functions
const movieExists = async (req, res, next) => {
    const { movieId } = req.params;
    if (req.originalUrl.includes("theaters")) res.locals.routePath = "theaters";
    else if (req.originalUrl.includes("reviews")) res.locals.routePath = "reviews";
    else if ( req.originalUrl.includes("theaters") || 
    !req.originalUrl.includes("reviews")) res.locals.routePath = null;
    const  movie = await moviesService.read(Number(movieId), 
    res.locals.routePath);
    if (movie) {
        res.locals.movie = movie;
        return next();
    };
    next({
        status: 404,
        message: "Movie cannot be found",
    });
};

const checkForQueryParam = async (req, res, next) => {
  const { is_showing } = req.query;
  const movies = await moviesService.list(is_showing);
  if (movies) {
    res.locals.movies = movies;
    next();
  }
  next({
    status: 404,
    message: "Movies not found."
  })
}

// Route handlers
const list = (req, res) => {
  const { movies: data } = res.locals;
  res.json({ data });
}

const read = (req, res) => {
    const { movie: data } = res.locals;
    res.json({ data });
}

module.exports = {
    read: [asyncErrorBoundary(movieExists), read],
  list: [asyncErrorBoundary(checkForQueryParam), list]
}