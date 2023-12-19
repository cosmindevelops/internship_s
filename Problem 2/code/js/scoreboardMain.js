import {Scoreboard} from "./Scoreboard.js"

document.addEventListener("DOMContentLoaded", () => {
    const scoreboard = new Scoreboard()
    scoreboard.loadAndDisplayHighScores()
})
