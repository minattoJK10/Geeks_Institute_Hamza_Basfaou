const db = require("../config/db");

const createUser = async (trx, userData, hashData) => {
  const user = await trx("users")
    .insert(userData)
    .returning("*");

  await trx("hashpwd").insert(hashData);

  return user[0];
};

const getUsers = () => db("users").select("*");

const getUserById = (id) => db("users").where({ id }).first();

const getUserByUsername = (username) =>
  db("hashpwd").where({ username }).first();

const updateUser = (id, data) =>
  db("users").where({ id }).update(data).returning("*");

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByUsername,
  updateUser
};
