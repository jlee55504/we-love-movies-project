const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const VALID_PROPERTIES = [
    "review_id",
    "content",
    "score",
    "created_at",
    "updated_at",
    "critic_id",
    "movie_id",
    "critic"
]



// Middleware functions
const reviewExists = async (req, res, next) => {
   const { reviewId } = req.params; 
  const review = await reviewsService.read(reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    next({
        status: 404,
        message: `/cannot be found /reviews/${req.params.reviewId}`,
    })
}

const hasOnlyValidProperties = async (req, res, next) => {
    const { data = {} } = req.body;
    const invalidFields = Object.keys(data).filter(field => !VALID_PROPERTIES.includes(field));
    if (invalidFields.length) {
        return next({
            status: 400,
            message: `Invalid field(s) ${invalidFields.join(", ")}`,
        });
    };
    next();
};

// Route handlers
const update = async (req, res) => {
    const updatedReview = { 
      ...res.locals.review,
          ...req.body.data,
          review_id: res.locals.review.review_id,
      };
      const data = await reviewsService.update(updatedReview);
    const answer = {...updatedReview, ...data};
      res.json({  data: answer });
  }
  
const destroy = (req, res) => {
    
}

module.exports = {
    update: [asyncErrorBoundary(reviewExists), hasOnlyValidProperties,  asyncErrorBoundary(update)]
};