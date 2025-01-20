# We Love Movies Project

The back-end of a web application that displays information on theaters, movies, and movie reviews.

## Features

  - **Movie Data Management:** Properly lists all the movie information.
  - **Reviews Data Management:** Properly lists, updates, and deletes all the reviews information. 
  - **Theater Data Management:** Properly lists all the theater information.
  - **REST API Implementation:** Built using a REST architecture.
  - **Error Handling:** Robust error handling for enhanced reliability.

## Technologies Used

  * **Express.js:** Core programming language (Express.js 4.17.1)
  * **Nodemon:** Automatically restarts the application when changes in the files are detected
  * **CORS:** Enables cross-domain requests
  * **Knex.js:** Builds and executes standard SQL queries  
  * **Dotenv:** Loads environment variables from a .env file into process.env
  * **PG:** A collection of Node.js modules used to interacte with a PostgresSQL database
  * **Morgan:** Prints the information of each HTTP request to the terminal window 
  * **Sqlite3:** Provides a lightweight disk-based database that doesn’t require a separate server process and allows a nonstandard variant of the SQL query language to access the database
  * **Supertest:** Unit testing framework

## Getting Started

### Prerequisites
 - Node Package Manager (NPM)

 ### Installation:

  1. Clone the repository:
     ```
     git clone https://github.com/jlee55504/we-love-movies-project.git
     ```
  2. Navigate to the project directory:
     ```
     cd we-love-movies-project
     ```
  3. Build the project:
     ```
     npm install
     ```
  4. Setup a PostgresSQL database
  5. Add the database address to the "DATABASE_URL" variable in the "knexfile.js" file
  6. Run the migrations:
     ```
     npx knex migrate:latest
     ```
  7. run the seed files:
     ```
     npx knex seed:run
     ```
  8. Run the application:
     ```
     npm run dev
     ```

## Usage

This application is the back-end of the "We Love Movies" project and needs to be used in conjunction with the front-end of the "We Love Movies" project (https://starter-movie-front-end-m3rt.onrender.com).

## Code Structure

  - ``src/db/migrations:`` Holds the Knex migrations for creating the tables used to store the data in the database
  - ``src/db/seeds:`` Holds the seeds that insert data into the database
  - ``src/errors:`` Handles any errors in the application
  - ``src/movies:`` Handles the HTTP requests, the route layout, and the data manipulation for the "movies" pathways
  - ``src/reviews:`` Handles the HTTP requests, the route layout, and the data manipulation for the "reviews" pathways
  - ``src/theaters:`` Handles the HTTP requests, the route layout, and the data manipulation for the "theaters" pathways
  - ``knexfile.js:`` Contains database configurations for different environments
  - ``src/utils/map-properties.js:`` Accepts an object and returns a new object with the source properties mapped to the target properties
  - ``src/utils/reduce-properties.js:`` Reduces an array of data by mapping properties onto array properties as objects
  - ``src/app.js:`` Attaches the router files and error handlers to the proper URL paths
  - ``src/server.js:`` Combines the Knex.js and app.js file to the server

## Acknowledgments

  - This project was built for the Chegg Skill's software engineering program
  - This project gave me real knowledge on back-end development and database manipulation
