import {QuizBank} from "./QuizBank.js"

const NUMBER_OF_QUESTIONS = 50

export class DataManager {
    constructor(apiUrl) {
        this.apiUrl = apiUrl
        this.quizBank = new QuizBank()
    }

    async fetchQuestions(category, difficulty, amount = NUMBER_OF_QUESTIONS) {
        const url = `${this.apiUrl}?amount=${amount}&type=multiple&difficulty=${difficulty}${category !== "any" ? `&category=${category}` : ""}`

        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error("Network response was not ok")
            }
            const data = await response.json()
            return data.results
        } catch (error) {
            return this.provideFallbackQuestions(error)
        }
    }

    provideFallbackQuestions(error) {
        return this.quizBank.getQuestions()
    }
}
