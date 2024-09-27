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

}

const read = (movie_id, routePath = null) => {
    if (!routePath) {
        return knex("movies as m")
            .select("*")
            .where({"m.movie_id": movie_id })
            .first();
    }
    if (routePath === "theaters") {
        return knex("movies as m")
            .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
            .join("theaters as t", "t.theater_id", "mt.theater_id")
            .select("t.*", "mt.is_showing", "mt.movie_id")
      .groupBy("t.theater_id")
            .orderBy("t.theater_id");
    } else if (routePath  === "reviews") {
        return knex("reviews as r")
            .join("movies as m", "m.movie_id", "r.movie_id")
            .join("critics as c", "c.critic_id", "r.critic_id")
             .select(knex.raw("distinct m.movie_id, r.*,c.critic_id, c.*" ))//
          .groupBy("c.critic_id")
      .then((response) => {
        const answer = []
        for (const critic of response) {
          answer.push(addCritic(critic))
        };
          return answer;
      });
    };
};

module.exports = {
    read,
    list,
}