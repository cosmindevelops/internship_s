export class UIManager {
    constructor() {
        this.quizContainer = document.querySelector(".quiz-container")
        this.generateQuizButton = document.getElementById("start-btn")
        this.categorySelect = document.getElementById("category")
        this.difficultyRadios = document.getElementsByName("difficulty")
        this.usernameInput = document.getElementById("username")
    }

    displayQuestion(question) {
        // Golește conținutul actual
        this.quizContainer.innerHTML = ""

        // Adaugă întrebarea
        const questionElement = document.createElement("div")
        questionElement.className = "quiz-question"
        questionElement.innerText = question.getQuestionText()
        this.quizContainer.appendChild(questionElement)

        // Adaugă fiecare opțiune de răspuns ca un buton
        question.getAnswerOptions().forEach((option) => {
            const button = document.createElement("button")
            button.className = "answer-btn"
            button.innerText = option
            button.addEventListener("click", () => {
                // Logica pentru când un răspuns este selectat
            })
            this.quizContainer.appendChild(button)
        })

        // Adaugă butonul de trimitere a răspunsului
        const submitButton = this.createSubmitButton(() => {
            // Logica pentru trimiterea răspunsului
        })
        this.quizContainer.appendChild(submitButton)
    }

    transformStartButtonToSubmit() {
        const startButton = document.getElementById('start-btn');
        startButton.innerText = 'Submit Question';
        startButton.id = 'submit-answer-btn';
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

    updateQuizHeader(username, score, totalQuestions) {
        const header = this.createQuizHeader(username, score, totalQuestions)
        this.quizContainer.appendChild(header)
    }

    createQuizHeader(username, score, totalQuestions) {
        const header = document.createElement("div")
        header.className = "quiz-header"
        header.innerHTML = `<h2>${username}: Score ${score}/${totalQuestions}</h2>`
        return header
    }

    createRetryButton() {
        const retryButton = document.createElement("button")
        retryButton.textContent = "Try Again"
        retryButton.id = "retry-button"
        retryButton.addEventListener("click", () => document.location.reload())
        return retryButton
    }
    
    createSubmitButton(callback) {
        const submitButton = document.createElement("button");
        submitButton.id = "submit-answer";
        submitButton.textContent = "Submit Answer";
        submitButton.addEventListener("click", callback);
        return submitButton;
    }
}
