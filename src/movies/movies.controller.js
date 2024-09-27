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


// Route handlers
const list = (req, res) => {

}

const read = (req, res) => {
    const { movie: data } = res.locals;
    res.json({ data });
}

module.exports = {
    read: [asyncErrorBoundary(movieExists), read],
}