export class UIManager {
    constructor() {
        this.quizContainer = document.querySelector(".quiz-container")
        this.startQuizButton = document.getElementById("start-btn")
        this.categorySelect = document.getElementById("category")
        this.difficultyRadios = document.getElementsByName("difficulty")
        this.usernameInput = document.getElementById("username")
    }

    /**
     * Displays a question on the UI and sets up the answer options.
     * @param {Question} question - The question object to be displayed.
     * @param {Function} submitCallback - The callback function to be called when the user submits an answer.
     */
    displayQuestion(question, submitCallback) {
        this.quizContainer.innerHTML = ""

        const questionElement = this.createQuestionElement(question.getQuestionText())
        this.quizContainer.appendChild(questionElement)

        const answersContainer = this.createAnswersContainer()
        question.getAnswerOptions().forEach((option) => {
            const answerButton = this.createAnswerButton(option)
            answersContainer.appendChild(answerButton)
        })

        this.quizContainer.appendChild(answersContainer)

        const submitButton = this.createSubmitButton(submitCallback)
        this.quizContainer.appendChild(submitButton)
    }

    /**
     * Creates a question element with the specified text.
     * @param {string} text - The text to be displayed in the question element.
     * @returns {HTMLElement} The created question element.
     */
    createQuestionElement(text) {
        const questionElement = document.createElement("div")
        questionElement.className = "quiz-question"
        questionElement.innerText = text
        return questionElement
    }

    /**
     * Creates a container for quiz answers.
     * @returns {HTMLElement} The created answers container.
     */
    createAnswersContainer() {
        const answersContainer = document.createElement("div")
        answersContainer.className = "quiz-answers"
        return answersContainer
    }

    /**
     * Creates an answer button element with the specified option.
     * @param {string} option - The option text for the button.
     * @returns {HTMLButtonElement} The created answer button element.
     */
    createAnswerButton(option) {
        const button = document.createElement("button")
        button.className = "answer-btn"
        button.innerText = option
        button.addEventListener("click", () => {
            this.setSelectedAnswer(option, button)
        })
        return button
    }

    /**
     * Sets the selected answer and updates the UI accordingly.
     * @param {string} option - The selected answer option.
     * @param {HTMLElement} clickedButton - The button element that was clicked.
     */
    setSelectedAnswer(option, clickedButton) {
        document.querySelectorAll(".answer-btn").forEach((btn) => {
            btn.classList.remove("answer-btn-selected")
        })
        clickedButton.classList.add("answer-btn-selected")
        this.selectedAnswer = option
    }

    /**
     * Creates a submit button element.
     * @param {Function} submitCallback - The callback function to be executed when the button is clicked.
     * @returns {HTMLButtonElement} The created submit button element.
     */
    createSubmitButton(submitCallback) {
        const submitButton = document.createElement("button")
        submitButton.id = "submit-answer"
        submitButton.textContent = "Submit Answer"
        submitButton.addEventListener("click", () => submitCallback(this.selectedAnswer))
        return submitButton
    }

    /**
     * Retrieves the selected category from the UI.
     * @returns {string} The selected category.
     */
    getSelectedCategory() {
        return this.categorySelect.value
    }

    /**
     * Retrieves the selected difficulty from the UI.
     * @returns {string} The value of the selected difficulty.
     */
    getSelectedDifficulty() {
        return Array.from(this.difficultyRadios).find((radio) => radio.checked).value
    }

    /**
     * Retrieves the username from the input field.
     * @returns {string} The trimmed username value.
     */
    getUsername() {
        return this.usernameInput.value.trim()
    }

    /**
     * Clears the quiz container by removing all its contents.
     */
    clearQuizContainer() {
        this.quizContainer.innerHTML = ""
    }

    /**
     * Updates the scoreboard with the given username, score, and total number of questions.
     * @param {string} username - The username to be displayed on the scoreboard.
     * @param {number} score - The current score of the user.
     * @param {number} totalQuestions - The total number of questions in the quiz.
     */
    displayScoreboard(username, score, totalQuestions) {
        let headerElement = document.querySelector(".quiz-header")
        headerElement.innerHTML = `<h3>${username}: Score ${score}/${totalQuestions}</h3>`
    }

    /**
     * Ends the quiz and displays the user's score and a play again button.
     * @param {string} username - The username of the user.
     * @param {number} score - The score achieved by the user.
     * @param {number} totalQuestions - The total number of questions in the quiz.
     */
    endQuiz(username, score, totalQuestions) {
        const quizContainer = document.querySelector(".quiz-container")
        const quizHeader = document.querySelector(".quiz-header")

        if (quizContainer && quizHeader) {
            quizHeader.style.display = "none"
            quizContainer.innerHTML = ""

            const endMessage = `🎉Congratulations ${username}, your score is ${score}/${totalQuestions}.🎉`
            const endMessageElement = document.createElement("div")
            endMessageElement.innerText = endMessage
            endMessageElement.className = "end-message"

            quizContainer.appendChild(endMessageElement)

            const playAgainButton = document.createElement("button")
            playAgainButton.innerText = "Play Again"
            playAgainButton.id = "play-again-btn"

            playAgainButton.addEventListener("click", () => {
                location.reload()
            })

            quizContainer.appendChild(playAgainButton)
        } else {
            console.error("Quiz container or header element not found")
        }
    }
}
