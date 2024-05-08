const knex = require("../db/connection");

function list() {
  return knex("comments")
    .select("*");
}

function listCommenterCount() {
  return knex("comments as c")
    .select("u.user_email as commenter_email")
    .select(knex.raw('cast(count(c.comment_id) as integer) as count'))
    .join("users as u", "c.commenter_id", "u.user_id")
    .groupBy("u.user_email")
    .orderBy("u.user_email");
}

function read(commentId) {
  return knex("comments as c")
    .select("c.comment_id", "c.comment", "u.user_email as commenter_email", "p.post_body as commented_post")
    .where({ "c.comment_id": commentId })
    .join("users as u", "c.commenter_id", "u.user_id")
    .join("posts as p", "c.post_id", "p.post_id")
    .first();
}

module.exports = {
  list,
  listCommenterCount,
  read,
};
