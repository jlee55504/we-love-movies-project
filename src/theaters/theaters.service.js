const knex = require("../db/connection");

const list = data => {
  if (data === "movies") {
    return knex("movies as m")
      .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
      .join("theaters as t", "t.theater_id", "mt.theater_id")
      .select(knex.raw("t.theater_id, m.*, mt.is_showing"));
  } else if (data === "theaters") {
      return knex("movies as m")
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
        .join("theaters as t", "t.theater_id", "mt.theater_id")
        .select(knex.raw("distinct t.theater_id, t.*"));
  };
};


module.exports = {
    list,
};