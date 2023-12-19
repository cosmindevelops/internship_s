export class Scoreboard {
    constructor() {
        this.currentScore = 0
        this.highScores = JSON.parse(localStorage.getItem("highScores")) || {}
    }

    incrementScore() {
        this.currentScore++
    }

    getCurrentScore() {
        return this.currentScore
    }

    addHighScore(username) {
        if (!this.highScores[username] || this.currentScore > this.highScores[username]) {
            this.highScores[username] = this.currentScore
            localStorage.setItem("highScores", JSON.stringify(this.highScores))
        }
    }

    resetCurrentScore() {
        this.currentScore = 0
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const scoreboardElement = document.getElementById("scoreboard")
    if (scoreboardElement) {
        const highScores = JSON.parse(localStorage.getItem("highScores")) || {}
        const scoreboardBody = scoreboardElement.querySelector("tbody")

        for (const [username, score] of Object.entries(highScores)) {
            const row = document.createElement("tr")
            const usernameCell = document.createElement("td")
            const scoreCell = document.createElement("td")

            usernameCell.textContent = username
            scoreCell.textContent = score

            row.appendChild(usernameCell)
            row.appendChild(scoreCell)

            scoreboardBody.appendChild(row)
        }
    }
})
