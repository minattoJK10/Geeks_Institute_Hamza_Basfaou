import db from "../config/db.js";

const getAll = () => db("tasks").select("*");
const getById = (id) => db("tasks").where({ id }).first();
const create = (task) => db("tasks").insert(task).returning("*");
const update = (id, data) => db("tasks").where({ id }).update(data).returning("*");
const remove = (id) => db("tasks").where({ id }).del().returning("*");

export default { getAll, getById, create, update, remove };
