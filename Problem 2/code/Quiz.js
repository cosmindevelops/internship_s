export class Quiz {
    constructor(questions, uiManager, scoreboard, username) {
        this.questions = questions;
        this.uiManager = uiManager;
        this.scoreboard = scoreboard;
        this.username = username;
        this.currentQuestionIndex = 0;
    }

    start() {
        this.displayCurrentQuestion();
        console.log(this.questions)
    }

    displayCurrentQuestion() {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        this.uiManager.displayQuestion(currentQuestion);
        // Alte logici pentru afișarea întrebării curente
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
            this.displayCurrentQuestion();
        } else {
            this.endQuiz();
        }
    }

    submitAnswer(selectedAnswer) {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        if (currentQuestion.checkAnswer(selectedAnswer)) {
            this.scoreboard.incrementScore();
        }
        this.nextQuestion();
    }

    endQuiz() {
        this.scoreboard.addHighScore(this.username);
        this.uiManager.displayResults(this.scoreboard.getCurrentScore(), this.questions.length);
    }

    // Alte metode necesare
}
