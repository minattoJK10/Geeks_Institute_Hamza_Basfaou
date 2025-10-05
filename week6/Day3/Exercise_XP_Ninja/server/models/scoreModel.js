import db from "../config/db.js";

export const addScore = async (username, score) => {
  const [inserted] = await db("scores").insert({ username, score }).returning("*");
  return inserted;
};

export const getScores = async () => {
  return await db("scores").select("*").orderBy("score", "desc");
};
