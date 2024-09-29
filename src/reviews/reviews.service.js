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

const read = (review_id) => {
  return knex("reviews")
    .select("*")
    .where({ review_id })
    .first();
};

const update = updatedReview => {
    return knex("reviews as r")
      .select("r.*")
      .where({ "r.review_id": updatedReview.review_id })
      .update(updatedReview, "*")
      .then(() => {
        return knex("reviews as r") .join("critics as c", "c.critic_id", "r.critic_id")
          .select("c.*")
          .where({ "r.review_id": updatedReview.review_id })
          .first();
      })
      .then(addCritic);
};

const destroy = review_id => {
    return knex("reviews")
      .select("*")
      .where({ review_id })
      .del();
};

module.exports = {
  delete: destroy,
  update,
  read
};