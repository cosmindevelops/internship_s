export class Question {
    constructor(questionData, id) {
        this.id = id
        this.category = questionData.category
        this.text = this.decodeHtml(questionData.question)
        this.correctAnswer = this.decodeHtml(questionData.correct_answer)
        this.options = [...questionData.incorrect_answers, questionData.correct_answer]
        this.randomizeAnswerOrder()
    }

    randomizeAnswerOrder() {
        for (let i = this.options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[this.options[i], this.options[j]] = [this.options[j], this.options[i]]
        }
    }

    decodeHtml(html) {
        const txt = document.createElement("textarea")
        txt.innerHTML = html
        return txt.value
    }

    checkAnswer(selectedAnswer) {
        return selectedAnswer === this.correctAnswer
    }

    getQuestionText() {
        return this.text
    }

    getAnswerOptions() {
        return this.options
    }
}
