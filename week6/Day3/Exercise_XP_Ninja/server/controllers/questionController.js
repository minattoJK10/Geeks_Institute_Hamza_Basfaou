
import * as QuestionModel from "../models/questionModel.js";

export const getQuestions = async (req, res) => {
  try {
    const questions = await QuestionModel.getAllQuestions();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getQuestion = async (req, res) => {
  try {
    const question = await QuestionModel.getQuestionById(req.params.id);
    if (!question) return res.status(404).json({ error: "Question not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
