const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
});

const list =(isShowing = null) => {
  if (!isShowing) {
    return knex("movies as m").select("*");
  } else if (isShowing) {
    return knex("movies as m")
      .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .select(knex.raw("distinct m.movie_id,m.* , mt.is_showing"))
    .where({"mt.is_showing": 1})
  };
};

const read = (movie_id, routePath = null) => {
    if (!routePath) {
        return knex("movies as m")
            .select("*")
            .where({movie_id})
            .first();
    } else if (routePath === "theaters") {
        return knex("theaters as t")
          .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
          .select("t.*", "mt.is_showing", "mt.movie_id")
          .where({ "mt.movie_id": movie_id })
    } else if (routePath  === "reviews") {
        return knex("reviews as r")
          .join("critics as c", "c.critic_id", "r.critic_id")
           .select("c.*", "r.*")
           .where({ "r.movie_id": movie_id })
           .then((response) => {
             const answer = [];
             for (const critic of response) {
               answer.push(addCritic(critic));
             };
             return answer;
           });
      };
};

module.exports = {
    read,
    list,
};