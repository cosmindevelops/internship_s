export class Question {
    constructor(questionData, id) {
        this.id = id
        this.category = questionData.category
        this.difficulty = questionData.difficulty
        this.text = this.decodeHtmlEntities(questionData.question)
        this.correctAnswer = this.decodeHtmlEntities(questionData.correct_answer)
        this.options = [...(questionData.incorrect_answers ?? []).map((ans) => this.decodeHtmlEntities(ans)), this.correctAnswer]
        this.randomizeAnswerOrder()
    }

    /**
     * Randomizes the order of the answers.
     * This function shuffles the elements of the 'options' array using the Fisher-Yates algorithm.
     * @param {none} - This function does not take any parameters.
     * @return {none} - This function does not return any value.
     */
    randomizeAnswerOrder() {
        for (let i = this.options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[this.options[i], this.options[j]] = [this.options[j], this.options[i]]
        }
    }

    /**
     * Decodes HTML entities in a given string.
     * @param {string} html - The HTML string to decode.
     * @returns {string} - The decoded string.
     */
    decodeHtmlEntities(html) {
        if (html === null || html === undefined) return html
        const txt = document.createElement("textarea")
        txt.innerHTML = html
        return txt.value
    }

    /**
     * Checks if the selected answer is correct.
     * @param {any} selectedAnswer - The answer selected by the user.
     * @returns {boolean} - True if the selected answer is correct, false otherwise.
     */
    checkAnswer(selectedAnswer) {
        return selectedAnswer === this.correctAnswer
    }

    /**
     * Retrieves the text of the question.
     * @returns {string} The question text.
     */
    getQuestionText() {
        return this.text
    }

    /**
     * Retrieves the answer options for the question.
     * @returns {Array} The answer options.
     */
    getAnswerOptions() {
        return this.options
    }
}
