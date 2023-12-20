import {DataManager} from "./DataManager.js"
import {Question} from "./Question.js"
import {Quiz} from "./Quiz.js"
import {UIManager} from "./UIManager.js"
import {Scoreboard} from "./Scoreboard.js"

const uiManager = new UIManager()
const scoreboard = new Scoreboard()
const dataManager = new DataManager("https://opentdb.com/api.php")

uiManager.startQuizButton.addEventListener("click", () => {
    const username = uiManager.getUsername()
    const category = uiManager.getSelectedCategory()
    const difficulty = uiManager.getSelectedDifficulty()

    if (!username) {
        alert("Please enter your name")
        return
    }

    dataManager.fetchQuestions(category, difficulty).then((questionData) => {
        const questions = questionData.map((q, index) => new Question(q, index))
        console.log(questions)
        const quiz = new Quiz(questions, uiManager, scoreboard, username)
        uiManager.clearQuizContainer()
        quiz.startQuiz()
    })
})
