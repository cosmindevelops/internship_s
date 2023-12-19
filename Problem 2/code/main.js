import {DataManager} from "./DataManager.js"
import {Question} from "./Question.js"
import {Quiz} from "./quiz.js"
import {UIManager} from "./UIManager.js"
import {Scoreboard} from "./Scoreboard.js"

const uiManager = new UIManager()
const dataManager = new DataManager("https://opentdb.com/api.php")

uiManager.generateQuizButton.addEventListener("click", () => {
    const username = uiManager.getUsername()
    const category = uiManager.getSelectedCategory()
    const difficulty = uiManager.getSelectedDifficulty()

    if (!username) {
        alert("Please enter your name")
        return
    }

    dataManager.fetchQuestions(category, difficulty).then((questionData) => {
        const questions = questionData.map((q, index) => new Question(q, index))
        const scoreboard = new Scoreboard()
        const quiz = new Quiz(questions, uiManager, scoreboard, username)

        uiManager.clearQuizContainer()
        quiz.start()
    })
})
