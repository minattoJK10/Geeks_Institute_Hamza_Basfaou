import db from "../config/db.js";

export const getAllQuestions = async () => {
  const questions = await db("questions");
  const results = [];

  for (const q of questions) {
    const options = await db("options")
      .join("questions_options", "options.id", "questions_options.option_id")
      .where("questions_options.question_id", q.id)
      .select("options.id", "options.text");

    results.push({ ...q, options });
  }

  return results;
};

export const getQuestionById = async (id) => {
  const question = await db("questions").where({ id }).first();
  if (!question) return null;

  const options = await db("options")
    .join("questions_options", "options.id", "questions_options.option_id")
    .where("questions_options.question_id", id)
    .select("options.id", "options.text");

  return { ...question, options };
};
