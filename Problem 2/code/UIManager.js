export class UIManager {
    constructor() {
        this.quizContainer = document.querySelector(".quiz-container")
        this.generateQuizButton = document.getElementById("start-btn")
        this.categorySelect = document.getElementById("category")
        this.difficultyRadios = document.getElementsByName("difficulty")
        this.usernameInput = document.getElementById("username")
    }

    displayQuestion(question, submitCallback) {
        // Clear the current content
        this.quizContainer.innerHTML = ""

        // Add the question
        const questionElement = document.createElement("div")
        questionElement.className = "quiz-question"
        questionElement.innerText = question.getQuestionText()
        this.quizContainer.appendChild(questionElement)

        // Create a container for the answer buttons
        const answersContainer = document.createElement("div")
        answersContainer.className = "quiz-answers"
        this.quizContainer.appendChild(answersContainer)

        // Add each answer option as a button
        question.getAnswerOptions().forEach((option) => {
            const button = document.createElement("button")
            button.className = "answer-btn"
            button.innerText = option
            button.addEventListener("click", () => {
                // Remove the selected class from all answer buttons
                document.querySelectorAll(".answer-btn").forEach((btn) => {
                    btn.classList.remove("answer-btn-selected")
                })

                // Add the selected class to the clicked button
                button.classList.add("answer-btn-selected")

                this.selectedAnswer = option // Set the selected answer
            })
            answersContainer.appendChild(button) // append the button to the answers container
        })

        // Add the submit answer button
        const submitButton = this.createSubmitButton(submitCallback)
        this.quizContainer.appendChild(submitButton)
    }

    getSelectedCategory() {
        return this.categorySelect.value
    }

    getSelectedDifficulty() {
        return Array.from(this.difficultyRadios).find((radio) => radio.checked).value
    }

    getUsername() {
        return this.usernameInput.value.trim()
    }

    clearQuizContainer() {
        this.quizContainer.innerHTML = ""
    }

    createSubmitButton(submitCallback) {
        const submitButton = document.createElement("button")
        submitButton.id = "submit-answer"
        submitButton.textContent = "Submit Answer"
        submitButton.addEventListener("click", () => {
            submitCallback(this.selectedAnswer)
        })
        return submitButton
    }

    displayScoreboard(username, score, totalQuestions) {
        let headerElement = document.querySelector(".quiz-header")
        headerElement.innerHTML = `<h3>${username}: Score ${score}/${totalQuestions}</h3>`
    }

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

            // Create the "Play Again" button
            const playAgainButton = document.createElement("button")
            playAgainButton.innerText = "Play Again"
            playAgainButton.id = "play-again-btn"

            // Add an event listener to the "Play Again" button
            playAgainButton.addEventListener("click", () => {
                location.reload() // This will reload the page
            })

            // Add the "Play Again" button to the quiz container
            quizContainer.appendChild(playAgainButton)
        } else {
            console.error("Quiz container or header element not found")
        }
    }
}
