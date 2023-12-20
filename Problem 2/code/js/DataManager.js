import {QuizBank} from "./QuizBank.js"

const NUMBER_OF_QUESTIONS = 5
const FETCH_TIMEOUT = 2000

export class DataManager {
    constructor(apiUrl) {
        this.apiUrl = apiUrl
        this.quizBank = new QuizBank()
    }

    /**
     * Fetches questions from an API based on the specified category, difficulty, and amount.
     * @param {string} category - The category of the questions. Use "any" for any category.
     * @param {string} difficulty - The difficulty level of the questions.
     * @param {number} [amount=NUMBER_OF_QUESTIONS] - The number of questions to fetch. Defaults to a predefined constant value.
     * @returns {Promise<Array<Object>>} - A promise that resolves to an array of question objects.
     */
    async fetchQuestions(category, difficulty, amount = NUMBER_OF_QUESTIONS, timeout = 2000) {
        const url = `${this.apiUrl}?amount=${amount}&type=multiple&difficulty=${difficulty}${category !== "any" ? `&category=${category}` : ""}`;
    
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
    
        try {
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(id);
    
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
    
            const data = await response.json();
            return data.results;
        } catch (error) {
            clearTimeout(id);
            return this.provideFallbackQuestions(error);
        }
    }

    /**
     * Provides fallback questions in case of an error.
     * @param {Error} error - The error that occurred.
     * @returns {Array} - An array of fallback questions.
     */
    provideFallbackQuestions(error) {
        return this.quizBank.getQuestions()
    }
}
