export class Scoreboard {
    constructor() {
        this.currentScore = 0;
        this.highScores = {}; // Un dicționar pentru a stoca scorurile maxime ale utilizatorilor
    }

    incrementScore() {
        this.currentScore++;
    }

    getCurrentScore() {
        return this.currentScore;
    }

    addHighScore(username) {
        if (!this.highScores[username] || this.currentScore > this.highScores[username]) {
            this.highScores[username] = this.currentScore;
        }
    }

    getHighScores() {
        return this.highScores;
    }

    resetCurrentScore() {
        this.currentScore = 0;
    }
}
