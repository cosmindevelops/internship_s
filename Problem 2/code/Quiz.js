export class Quiz {
    constructor(questions, uiManager, scoreboard, username) {
        this.questions = questions
        this.uiManager = uiManager
        this.scoreboard = scoreboard
        this.username = username
        this.remainingIndices = this.generateIndicesArray(this.questions.length)
    }

    start() {
        this.scoreboard.resetCurrentScore()
        this.uiManager.displayScoreboard(this.username, this.scoreboard.getCurrentScore(), this.questions.length)
        console.log(this.questions)
        this.displayNextQuestion()
    }

    generateIndicesArray(length) {
        return Array.from({length}, (_, i) => i)
    }

    getRandomIndex() {
        const randomPos = Math.floor(Math.random() * this.remainingIndices.length)
        return this.remainingIndices.splice(randomPos, 1)[0]
    }

    displayNextQuestion() {
        if (this.remainingIndices.length === 0) {
            this.endQuiz()
            return
        }

        const randomIndex = this.getRandomIndex()
        const currentQuestion = this.questions[randomIndex]

        this.uiManager.displayQuestion(currentQuestion, (selectedAnswer) => {
            this.submitAnswer(selectedAnswer, currentQuestion)
        })
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex]
    }

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

    endQuiz() {
        this.scoreboard.addHighScore(this.username)
        this.uiManager.endQuiz(this.username, this.scoreboard.getCurrentScore(), this.questions.length)
    }
}
