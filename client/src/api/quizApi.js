// src/api/quizService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export const fetchQuizQuestions = async () => {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      'You are a quiz bot that generates engaging and educational multiple-choice questions about stock markets and trading. Each question set should cover a range of topics from basic to moderately advanced, providing a mix of question types. Generate exactly 5 unique, non-repeating questions per set, each with 4 options. Vary the topics within each set, covering foundational terms, market functions, stock analysis, trading strategies, and risk management. Aim to provide different questions each time, avoiding recent repeats, so each quiz session feels fresh. Questions should span from beginner-level concepts (e.g., "What is a stock?") to intermediate topics (e.g., "How does diversification reduce risk?"). For each request, generate a new set of questions that meets these guidelines.',
  });

  const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  try {
    const chatSession = model.startChat({ generationConfig });
    const result = await chatSession.sendMessage("Generate new set of questions");
    const response = JSON.parse(result.response.text());

    const formattedQuestions = response.questions.map((q) => ({
      question: q.question,
      options: q.options,
      answer: q.options.indexOf(q.answer),
    }));

    return formattedQuestions;
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    throw new Error("Failed to fetch quiz questions");
  }
};