export class DataManager {
    constructor(apiUrl) {
        this.apiUrl = apiUrl
    }

    fetchQuestions(category, difficulty, amount = 50) {
        const url = `${this.apiUrl}?amount=${amount}&type=multiple&difficulty=${difficulty}${category !== "any" ? `&category=${category}` : ""}`

        return fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
                return response.json()
            })
            .then((data) => data.results)
            .catch((error) => this.handleError(error))
    }

    handleError(error) {
        console.error("Error fetching data:", error)
    }
}
