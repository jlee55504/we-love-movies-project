# WeLoveMovies Project
Completed Chegg Skills "We-Love-Movies" "Qualified" project.

## Overview:
This project builds out specific routes so that users can gain access to data about movies, theaters, and reviews.

## Buit with:
  * Express
  * Lodash
  * Nodemon
  * CORS
  * Knex
  * Dotenv
  * PG
  * Morgan
  * Sqlite3
  * Supertest used for testing

## src/db/migrations
Holds the Knex migrations for creating the tables used to store the data in the database.


## src/db/seeds
Holds the seeds that insert the data into the database.


## src/errors

### asyncBoundary.js
Handles any async error thrown by an async function.

### errorHandler.js
Sends any errors back to users along with the status code.

### methodNotAllowed.js
Throws an error if an improper http method is used.


## src/movies

### movies.controller.js
Contains the middleware functions and route handlers for the '/movies' 'path'. It lists the all the movies in the database depending on whether the movie is showing or not and displays specific movies, all the theaters where a specific movie is playing, and all the reviews for a specific movie.

### movies.router.js
Attaches all the route handlers to the '/movies' 'pathways'.

### movies.service.js
Contains all the functions to manipulate the database.


## src/reviews

### reviews.controller.js
Contains the middleware functions and route handlers for the '/reviews' 'path'. It can update and delete reviews held in the database. Updating a review will also return the critic information related to the specific review.

### reviews.router.js
Attaches all the route handlers to the '/reviews' 'pathways'.

### reviews.service.js
Contains all the functions to manipulate the database.


## src/theaters

### theaters.controller.js
Contains the route handlers for the '/theaters' 'path'. It returns all the theaters with all the movies realated to the theater.

### theaters.router.js
Attaches the 'list' route handler to the '/theaters' 'pathway'.

### theaters.service.js
Contains the 'list' function which retrieves the proper data from the database.


## src/utils

### map-properties.js
Accepts an object and returns a new object with the source properties mapped to the target properties.

### reduce-properties.js
Reduces an array of data by mapping properties onto array properties as objects.


## src/app.js
Attaches the routers to the proper URL paths and the 'notFound' and 'errorHandler' 'functions'.

## src/server.js
Combines the Knex.js and app.js file to the server.


## knexfile.js
Contains database configurations for different environments.