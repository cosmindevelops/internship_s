export class Scoreboard {
    constructor() {
        this.currentScore = 0
        this.highScores = this.loadHighScores()
    }

    /**
     * Increments the current score by 1.
     */
    incrementScore() {
        this.currentScore++
    }

    /**
     * Retrieves the current score.
     * @returns {number} The current score.
     */
    getCurrentScore() {
        return this.currentScore
    }

    /**
     * Adds a high score for a given username.
     * If the username doesn't exist in the highScores object or the current score is higher than the existing score,
     * the high score is updated and saved.
     * @param {string} username - The username for which to add the high score.
     */
    addHighScore(username) {
        if (this.currentScore > 0 && (!this.highScores[username] || this.currentScore > this.highScores[username])) {
            this.highScores[username] = this.currentScore
            this.saveHighScores()
        }
    }

    /**
     * Resets the current score to zero.
     */
    resetCurrentScore() {
        this.currentScore = 0
    }

    /**
     * Loads the high scores from the local storage.
     * @returns {Object} The high scores object.
     */
    loadHighScores() {
        return JSON.parse(localStorage.getItem("highScores")) || {}
    }

    /**
     * Saves the high scores to the local storage.
     */
    saveHighScores() {
        localStorage.setItem("highScores", JSON.stringify(this.highScores))
    }

    /**
     * Loads and displays the high scores on the scoreboard.
     */
    loadAndDisplayHighScores() {
        const scoreboardElement = document.getElementById("scoreboard")
        if (scoreboardElement) {
            const scoreboardBody = scoreboardElement.querySelector("tbody")

            scoreboardBody.innerHTML = ""

            for (const [username, score] of Object.entries(this.highScores)) {
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
    }
}
