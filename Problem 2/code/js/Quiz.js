export class Quiz {
    constructor(questions, uiManager, scoreboard, username) {
        this.questions = questions
        this.uiManager = uiManager
        this.scoreboard = scoreboard
        this.username = username
        this.remainingIndices = this.initializeQuestionIndices(this.questions.length)
    }

    /**
     * Starts the quiz by resetting the current score, displaying the scoreboard, and displaying the next question.
     */
    startQuiz() {
        this.scoreboard.resetCurrentScore()
        this.uiManager.displayScoreboard(this.username, this.scoreboard.getCurrentScore(), this.questions.length)
        this.displayNextQuestion()
    }

    /**
     * Ends the quiz by adding the current user's high score to the scoreboard
     * and updating the UI to display the end of the quiz.
     *
     * @param {string} username - The username of the current user.
     * @return {void} This function does not return a value.
     */
    endQuiz() {
        this.scoreboard.addHighScore(this.username)
        this.uiManager.displayEndOfQuizUI(this.username, this.scoreboard.getCurrentScore(), this.questions.length)
    }

    /**
     * Initializes an array of question indices.
     * @param {number} length - The length of the array.
     * @returns {number[]} - An array of question indices.
     */
    initializeQuestionIndices(length) {
        return Array.from({length}, (_, i) => i)
    }

    /**
     * Returns a random index from the remainingIndices array.
     * @returns {number} The random index.
     */
    getRandomIndex() {
        const randomPos = Math.floor(Math.random() * this.remainingIndices.length)
        return this.remainingIndices.splice(randomPos, 1)[0]
    }

    /**
     * Retrieves a random question from the quiz.
     * @returns {Question|null} The random question, or null if there are no remaining questions.
     */
    getRandomQuestion() {
        if (this.remainingIndices.length === 0) {
            return null
        }
        const randomIndex = this.getRandomIndex()
        return this.questions[randomIndex]
    }

    /**
     * Displays the next question in the quiz.
     */
    displayNextQuestion() {
        const currentQuestion = this.getRandomQuestion()
        if (currentQuestion) {
            this.uiManager.displayQuestion(currentQuestion, (selectedAnswer) => {
                this.submitAnswer(selectedAnswer, currentQuestion)
            })
        } else {
            this.endQuiz()
        }
    }

    /**
     * Submits the selected answer for the current question and updates the scoreboard and UI accordingly.
     * @param {string} selectedAnswer - The selected answer for the current question.
     * @param {Question} currentQuestion - The current question object.
     */
    submitAnswer(selectedAnswer, currentQuestion) {
        if (currentQuestion.checkAnswer(selectedAnswer)) {
            this.scoreboard.incrementScore()
        }

        this.uiManager.displayScoreboard(this.username, this.scoreboard.getCurrentScore(), this.questions.length)

        if (this.remainingIndices.length > 0) {
            this.displayNextQuestion()
        } else {
            this.endQuiz()
        }
    }
}
