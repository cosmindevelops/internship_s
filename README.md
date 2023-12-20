## Internship Problems

## Table of Contents

1. [Solution 1](#solution-1)
    - [Task 1: Class Diagram](#task-1-class-diagram)
    - [Task 2: Database Schema](#task-2-database-schema)
2. [Solution 2](#solution-2)
    - [Task 1: Logical Design](#task-1-logical-design)
    - [Task 2: Algorithm Implementation](#task-2-algorithm-implementation)
    - [Task 3: Class and Database Representation](#task-3-class-and-database-representation)

## Solution 1:

### Task 1: Class Diagram

### Descrierea Claselor

#### Clasa `Book`

-   **Atribute**:
    -   `BookID`: int - Identificator unic al cărții.
    -   `Title`: String - Titlul cărții.
    -   `Author`: String - Autorul cărții.
    -   `ISBN`: String - Codul ISBN al cărții.
    -   `Quantity`: int - Cantitatea disponibilă în bibliotecă.
-   **Metode**:
    -   `getDetails()`: String - Returnează detalii despre cartea respectivă.
    -   `updateQuantity(newQuantity: int)`: void - Actualizează cantitatea de cărți disponibile.
    -   `searchBooks(criteria: String)`: List<Book> - Caută cărți bazate pe criterii furnizate.

#### Clasa `Patron`

-   **Atribute**:
    -   `PatronID`: int - Identificator unic al utilizatorului.
    -   `Name`: String - Numele utilizatorului.
    -   `ContactInfo`: String - Informații de contact ale utilizatorului.
    -   `BorrowedBooks`: List<Book> - Lista de cărți împrumutate de utilizator.
    -   `Balance`: double - Suma totală de bani datorată de utilizator.
-   **Metode**:
    -   `borrowBook(book: Book)`: void - Permite utilizatorului să împrumute o carte.
    -   `returnBook(book: Book)`: void - Permite utilizatorului să returneze o carte împrumutată.
    -   `getTotalFines()`: double - Calculează amenzile totale pentru toate înregistrările de împrumut.
    -   `updateBalance()`: void - Actualizează balanța utilizatorului bazat pe amenzile totale.
    -   `getBorrowingHistory()`: List<BorrowingRecord> - Obține istoricul de împrumut al utilizatorului.

#### Clasa `BorrowingRecord`

-   **Atribute**:
    -   `RecordID`: int - Identificator unic pentru înregistrarea împrumutului.
    -   `BorrowedBook`: Book - Cartea care a fost împrumutată.
    -   `BorrowedBy`: Patron - Utilizatorul care a împrumutat cartea.
    -   `BorrowDate`: Date - Data la care cartea a fost împrumutată.
    -   `ReturnDate`: Date - Data până la care cartea trebuie returnată.
    -   `FineRate`: double - Rata amenzii pentru întârzierea returnării.
-   **Metode**:
    -   `calculateDueDate()`: Date - Calculează data de returnare a cărții.
    -   `isOverdue()`: boolean - Verifică dacă cartea a fost returnată după data scadentă.
    -   `calculateFine()`: double - Calculează amenda pentru această înregistrare specifică de împrumut.

#### Clasa `LibraryManager`

-   **Metode**:
    -   `addBook(book: Book)`: void - Adaugă o nouă carte în sistem.
    -   `removeBook(book: Book)`: void - Elimină o carte din sistem.
    -   `registerPatron(patron: Patron)`: void - Înregistrează un nou utilizator în sistem.
    -   `deregisterPatron(patron: Patron)`: void - Elimină un utilizator din sistem.
    -   `checkOutBook(book: Book, patron: Patron)`: void - Coordonează procesul de împrumut al unei cărți către un utilizator.
    -   `updateBookDetails(book: Book, newDetails: BookDetails)`: void - Actualizează detaliile unei cărți existente în sistem.

### Descriere Relații între Clase

1. **Relația dintre `Book` și `BorrowingRecord`**:

    - Clasa `Book` este asociată cu clasa `BorrowingRecord` printr-o relație de tipul one-to-many. Aceasta înseamnă că o singură carte (Book) poate fi asociată cu mai multe înregistrări de împrumut (BorrowingRecords), reprezentând fiecare dată când cartea a fost împrumutată de către utilizatori.

2. **Relația dintre `Patron` și `BorrowingRecord`**:

    - Clasa `Patron` are de asemenea o relație one-to-many cu `BorrowingRecord`. Un utilizator (Patron) poate avea multiple înregistrări de împrumut asociate cu el, indicând multiplele cărți pe care le-a împrumutat de-a lungul timpului.

3. **Relația dintre `Patron` și `Book` (indirectă prin `BorrowingRecord`)**:

    - În timp ce nu există o legătură directă între `Patron` și `Book` în modelul de clasă, există o relație many-to-many între aceste două clase, mediată de `BorrowingRecord`. Un utilizator poate împrumuta mai multe cărți, și o carte poate fi împrumutată de mai mulți utilizatori, dar aceste interacțiuni sunt urmărite individual prin înregistrări separate de împrumut.

4. **Interacțiunile cu `LibraryManager`**:
    - `LibraryManager` nu are o relație directă de stocare sau proprietate asupra claselor `Book`, `Patron`, sau `BorrowingRecord`, ci mai degrabă interacționează cu acestea prin metodele sale. `LibraryManager` funcționează ca un coordonator pentru operațiunile de adăugare, eliminare, înregistrare și împrumut ale cărților și utilizatorilor în sistem. Deși nu deține direct obiecte `Book` sau `Patron`, `LibraryManager` este responsabil pentru invocarea operațiunilor care afectează starea și relațiile dintre aceste obiecte.

<img src="./Problem 1/images/ClassDiagram.jpg" alt="Class Diagram" width="500"/>
<br>

### Task 2: Database Schema

### Descrierea Tabelelor

#### Tabelul `Books`

-   **Atribute**:
    -   `BookID`: Este cheia primară a tabelului și identificatorul unic pentru fiecare carte. Este o valoare autoincrementată, ceea ce înseamnă că baza de date va genera automat un număr nou și unic pentru fiecare înregistrare adăugată.
    -   `Title`: O șir de caractere care stochează titlul cărții. Este obligatoriu pentru fiecare înregistrare.
    -   `Author`: O șir de caractere care stochează numele autorului cărții. Este obligatoriu pentru fiecare înregistrare.
    -   `ISBN`: Un șir de caractere de lungimea 20, care stochează codul ISBN unic al cărții. Este marcat ca unic, ceea ce înseamnă că fiecare carte trebuie să aibă un ISBN diferit.
    -   `Quantity`: Un întreg care indică numărul de copii ale cărții disponibile pentru împrumut. Are o restricție care asigură că valoarea nu poate fi negativă.

#### Tabelul `Patrons`

-   **Atribute**:
    -   `PatronID`: Este cheia primară și identificatorul unic pentru fiecare patron (utilizator al bibliotecii). Este autoincrementată.
    -   `Name`: O șir de caractere care stochează numele patronului. Este obligatoriu pentru fiecare înregistrare.
    -   `ContactInfo`: O șir de caractere opțională care stochează informațiile de contact ale patronului.
    -   `Balance`: Un număr zecimal care reprezintă totalul de bani datorați de patron, de exemplu, din cauza întârzierilor la returnarea cărților. Are o restricție care asigură că valoarea nu poate fi negativă.

#### Tabelul `BorrowingRecords`

-   **Atribute**:
    -   `RecordID`: Cheia primară și identificatorul unic pentru fiecare înregistrare de împrumut. Este autoincrementată.
    -   `BookID`: O cheie străină care face referire la `BookID` din tabelul `Books`, legând împrumutul de cartea specifică.
    -   `PatronID`: O cheie străină care face referire la `PatronID` din tabelul `Patrons`, legând împrumutul de patronul specific.
    -   `BorrowDate`: Data la care cartea a fost împrumutată. Este obligatoriu pentru fiecare înregistrare.
    -   `ReturnDate`: Data la care cartea este așteptată să fie returnată. Poate fi null dacă cartea nu a fost încă returnată.
    -   `FineRate`: Un număr zecimal care reprezintă rata amenzii pentru întârzierea returnării cărții. Are o restricție care asigură că valoarea nu poate fi negativă.

### Descriere Relații dintre Tabele

-   **Books - BorrowingRecords**:

    -   Relația one-to-many între `Books` și `BorrowingRecords` este stabilită prin `BookID`. O carte poate avea multiple înregistrări de împrumut asociate cu ea, dar fiecare înregistrare de împrumut se referă la o singură carte.

-   **Patrons - BorrowingRecords**:
    -   Relația one-to-many între `Patrons` și `BorrowingRecords` este stabilită prin `PatronID`. Un patron poate avea mai multe înregistrări de împrumut asociate, dar fiecare înregistrare de împrumut se referă la un singur patron.

#### Codul SQL pentru Taberele

```sql
CREATE TABLE Books (
    BookID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Author VARCHAR(255) NOT NULL,
    ISBN VARCHAR(20) NOT NULL UNIQUE,
    Quantity INT NOT NULL CHECK (Quantity >= 0)
);

CREATE TABLE Patrons (
    PatronID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    ContactInfo VARCHAR(255),
    Balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00 CHECK (Balance >= 0)
);

CREATE TABLE BorrowingRecords (
    RecordID INT AUTO_INCREMENT PRIMARY KEY,
    BookID INT,
    PatronID INT,
    BorrowDate DATE NOT NULL,
    ReturnDate DATE,
    FineRate DECIMAL(5, 2) NOT NULL CHECK (FineRate >= 0),
    FOREIGN KEY (BookID) REFERENCES Books(BookID),
    FOREIGN KEY (PatronID) REFERENCES Patrons(PatronID)
);
```

<img src="./Problem 1/images/DatabaseDiagram.jpg" alt="Db Diagram" width="500"/>
<br>

## Solution 2:

## Task 1: Logical Design

### Prezentare Generală

Această Aplicație de Quiz este o aplicație web interactivă și dinamică, care generează și prezintă întrebări din baza de date Open Trivia Database. Este proiectată pentru a menține scorurile, pentru a asigura lipsa repetițiilor întrebărilor și pentru a oferi o experiență atractivă utilizatorului.

## Componente

Aplicația constă în mai multe componente cheie:

### 1. `DataManager`

-   **Responsabilitate**: Gestionarea apelurilor API către Open Trivia Database (`https://opentdb.com/api.php`).
-   **Funcționalitate**:
    -   Aduce un set de întrebări bazate pe parametri specificați, cum ar fi categoria și dificultatea.
    -   În cazul unei defecțiuni a API, recuperează un set simulat de întrebări de la clasa `QuizBank`.

### 2. `Question`

-   **Responsabilitate**: Reprezintă o singură întrebare din quiz.
-   **Funcționalitate**:
    -   Maparea datelor JSON din API în clasa `Question`.
    -   Decodifică entitățile HTML pentru a preveni afișarea caracterelor HTML brute.
    -   Amestecă ordinea răspunsurilor pentru fiecare întrebare.

### 3. `Quiz`

-   **Responsabilitate**: Gestionează logica generală a quiz-ului.
-   **Funcționalitate**:
    -   Începe quiz-ul și prezintă întrebările utilizatorului.
    -   Selectează întrebări aleatorii și asigură lipsa repetițiilor.
    -   Gestionează trimiterea răspunsurilor și tranziția între întrebări.
    -   Încheie quiz-ul și apelează `Scoreboard` pentru actualizarea scorurilor.

### 4. `UIManager`

-   **Responsabilitate**: Gestionează toate interacțiunile UI.
-   **Funcționalitate**:
    -   Afișează întrebările și opțiunile de răspuns.
    -   Actualizează UI-ul în funcție de interacțiunile utilizatorului (de exemplu, selectarea unui răspuns, trecerea la următoarea întrebare).
    -   Gestionează afișarea scorurilor și sumarele de la sfârșitul quiz-ului.

### 5. `Scoreboard`

-   **Responsabilitate**: Urmărește și gestionează scorurile.
-   **Funcționalitate**:
    -   Incrementează scorul utilizatorului pentru răspunsurile corecte.
    -   Salvează scorurile mari în stocarea locală și le actualizează dacă scorul curent depășește scorurile anterioare.

## Logica Principală (`main.js`)

-   Inițializează toate componentele (`DataManager`, `Question`, `Quiz`, `UIManager`, `Scoreboard`).
-   Ascultă evenimentul de începere a quiz-ului și recuperează inputurile utilizatorului (numele de utilizator, categoria, dificultatea).
-   Aduce întrebările folosind `DataManager` și începe quiz-ul folosind clasa `Quiz`.

## Fluxul Logic

1. **Inițializare**: Inputurile utilizatorului sunt colectate, iar `DataManager` aduce întrebările.
2. **Start Quiz**: După aducerea cu succes a întrebărilor, clasa `Quiz` se inițializează și începe să prezinte întrebări.
3. **Gestionarea Întrebărilor**: Fiecare întrebare este prezentată individual. Clasa `Question` asigură că răspunsurile sunt amestecate.
4. **Interacțiunea Utilizatorului**: Utilizatorii trimit răspunsuri, care sunt procesate pentru a actualiza scorurile și pentru a determina pașii următori.
5. **Urmărirea Progresului**: Aplicația urmărește numărul de întrebări răspunse și asigură că nu există repetiții.
6. **Sfârșitul Quiz-ului**: Odată ce toate întrebările sunt răspunse, quiz-ul se încheie. Scorul final este afișat, iar scorurile mari sunt actualizate dacă este necesar.

<img src="./Problem 2/images/quiz5.jpg" alt="Db Schema" width="600"/>
<br>

## Task 2: Algorithm Implementation

### Prezentare Generală

Această documentație descrie implementarea unei Aplicații de Quiz care preia întrebări de la Open Trivia Database API, le procesează și le afișează, și calculează scorurile utilizatorilor.

### Pași Cheie în Implementare

#### 1. Extragerea Întrebărilor din API

-   **Proces**: Aplicația inițiază prin efectuarea unui apel către Open Trivia Database API.
-   **Scop**: Pentru a recupera un set diversificat de întrebări de quiz bazate pe parametri specificați, cum ar fi categoria și dificultatea.

#### 2. Maparea Răspunsului API în Clasa `Question`

-   **Funcționalitate**:
    -   Fiecare întrebare primită de la API este transformată într-o instanță a clasei `Question`.
    -   Acest proces include decodarea entităților HTML și pregătirea întrebării pentru afișare.

```javascript
constructor(questionData, id) {
        this.id = id
        this.category = questionData.category
        this.text = this.decodeHtmlEntities(questionData.question)
        this.correctAnswer = this.decodeHtmlEntities(questionData.correct_answer)
        this.options = [...(questionData.incorrect_answers ?? []).map((ans) => this.decodeHtmlEntities(ans)), this.correctAnswer]
        this.randomizeAnswerOrder()
    }
```

#### 3. Amestecarea Răspunsurilor

-   **Metodă**: Metoda `randomizeAnswerOrder` din clasa `Question` folosește algoritmul de amestecare Fisher-Yates.
-   **Scop**: Pentru a asigura că opțiunile de răspuns sunt prezentate într-o ordine aleatorie pentru fiecare întrebare, prevenind orice modele previzibile.

```javascript
    randomizeAnswerOrder() {
        for (let i = this.options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[this.options[i], this.options[j]] = [this.options[j], this.options[i]]
        }
    }
```

#### 4. Alegerea unei Întrebări la Întâmplare

-   **Inițializare**:
    -   Clasa `Quiz` se inițializează cu un array de obiecte întrebare.
    -   Un array de indici (`remainingIndices`) este creat pentru a urmări ce întrebări au fost utilizate.
-   **Selectarea Întrebărilor Aleatorii**:
    -   Metoda `getRandomQuestion` selectează un index aleatoriu din `remainingIndices` folosind `getRandomIndex`.
    -   Odată ce o întrebare este selectată, indexul său este eliminat din `remainingIndices` pentru a preveni repetiția.

```javascript
    getRandomIndex() {
        const randomPos = Math.floor(Math.random() * this.remainingIndices.length)
        return this.remainingIndices.splice(randomPos, 1)[0]
    }

    getRandomQuestion() {
        if (this.remainingIndices.length === 0) {
            return null
        }
        const randomIndex = this.getRandomIndex()
        return this.questions[randomIndex]
    }
```

#### 5. Afișarea Întrebărilor și Calculul Scorului

-   **Flux**:
    -   Quiz-ul afișează continuu următoarea întrebare până când toate întrebările din `remainingIndices` sunt epuizate.
-   **Sfârșitul Quiz-ului**:
    -   La finalizare, scorul final al utilizatorului este calculat și afișat, reflectând numărul de întrebări la care s-a răspuns corect.

<img src="./Problem 2/images/quiz1.jpg" alt="Db Schema" width="500"/>
<br>

<img src="./Problem 2/images/quiz2.jpg" alt="Db Schema" width="500"/>
<br>

<img src="./Problem 2/images/quiz3.jpg" alt="Db Schema" width="500"/>
<br>

<img src="./Problem 2/images/quiz4.jpg" alt="Db Schema" width="500"/>
<br>

## Task 3: Class and Database Representation

### Descrierea Claselor

#### Clasa `Question`

-   **Atribute**:

    -   `questionId`: int - Identificator unic pentru întrebare.
    -   `questionText`: String - Textul întrebării propriu-zise.
    -   `options`: String[] - Opțiuni de răspuns disponibile pentru întrebare.
    -   `correctAnswer`: String - Opțiunea corectă de răspuns.

-   **Metode**:
    -   `getQuestionText()`: String - Returnează textul întrebării.
    -   `getOptions()`: String[] - Returnează opțiunile de răspuns pentru întrebare.
    -   `getCorrectAnswer()`: String - Returnează răspunsul corect al întrebării.
    -   `checkAnswer(userAnswer: String)`: boolean - Verifică dacă răspunsul utilizatorului este corect.

#### Clasa `Quiz`

-   **Atribute**:

    -   `quizId`: int - Identificator unic pentru quiz.
    -   `questions`: Question[] - O listă de întrebări ce compun quiz-ul.
    -   `currentQuestionIndex`: int - Indexul întrebării curente afișate utilizatorului.
    -   `userScore`: int - Scorul actual al utilizatorului.

-   **Metode**:
    -   `startQuiz()`: void - Inițializează quiz-ul și pregătește întrebările.
    -   `getCurrentQuestion()`: Question - Returnează întrebarea curentă din quiz.
    -   `submitAnswer(userAnswer: String)`: void - Primește răspunsul utilizatorului pentru întrebarea curentă și actualizează scorul.
    -   `getNextQuestion()`: Question - Avansează la următoarea întrebare din quiz.
    -   `calculateFinalScore()`: int - Calculează scorul final al utilizatorului după completarea quiz-ului.

#### Clasa `User`

-   **Atribute**:

    -   `userId`: int - Identificator unic pentru utilizator.
    -   `username`: String - Numele de utilizator.
    -   `quizHistory`: QuizAttempt[] - O listă de încercări de quiz-uri ale utilizatorului.

-   **Metode**:
    -   `takeQuiz(quizId: int)`: void - Începe un nou quiz.
    -   `getUsername()`: String - Returnează numele de utilizator.
    -   `getQuizHistory()`: QuizAttempt[] - Returnează istoricul quiz-urilor încercate de utilizator.
    -   `getHighestScore()`: int - Returnează cel mai înalt scor obținut de utilizator.

#### Clasa `QuizAttempt`

-   **Atribute**:

    -   `quizId`: int - Identificatorul quiz-ului încercat.
    -   `userId`: int - Identificatorul utilizatorului care a încercat quiz-ul.
    -   `score`: int - Scorul obținut în urma încercării.
    -   `completed`: boolean - Indică dacă quiz-ul a fost sau nu completat.
    -   `timestamp`: DateTime - Data și ora când a fost încercat quiz-ul.

-   **Metode**:
    -   `getScore()`: int - Returnează scorul obținut în încercarea curentă.
    -   `isCompleted()`: boolean - Verifică dacă quiz-ul a fost completat.
    -   `getTimestamp()`: DateTime - Returnează data și ora terminării quiz-ului.

#### Clasa `QuizManager`

-   **Atribute**:

    -   `availableQuizzes`: Quiz[] - O listă cu quiz-urile disponibile.
    -   `activeQuizzes`: Map<int, Quiz> - O hartă ce leagă utilizatorii de quiz-urile active.
    -   `userScores`: Map<int, int> - O hartă ce leagă utilizatorii de cel mai înalt scor obținut.

-   **Metode**:
    -   `createQuiz(questionIds: int[])`: Quiz - Creează un nou quiz folosind un set de id-uri de întrebări.
    -   `assignQuizToUser(userId: int, quiz: Quiz)`: void - Alocă un quiz unui utilizator.
    -   `randomizeQuestions(quiz: Quiz)`: void - Randomizează ordinea întrebărilor într-un quiz.
    -   `trackQuizProgress(userId: int)`: Quiz - Urmărește progresul unui quiz pentru un utilizator.
    -   `updateUserScore(userId: int, score: int)`: void - Actualizează cel mai înalt scor al unui utilizator.
    -   `getUserHighestScore(userId: int)`: int - Obține cel mai înalt scor al unui utilizator.

#### Descriere Relații între Clase

1. **Relația dintre `Quiz` și `Question`:**

    - Clasa `Quiz` conține mai multe instanțe ale clasei `Question`, ceea ce înseamnă că pentru fiecare quiz creat, se pot atașa mai multe întrebări. Este o relație de tipul one-to-many, unde un quiz specific are asociate mai multe întrebări diferite.

2. **Relația dintre `User` și `QuizAttempt`:**

    - Fiecare utilizator (`User`) poate avea asociate mai multe instanțe ale clasei `QuizAttempt`, fiecare reprezentând o încercare de a răspunde la un quiz. Aceasta reflectă o relație de tipul one-to-many, unde un singur utilizator poate avea multiple încercări de quiz înregistrate.

3. **Relația dintre `QuizAttempt` și `Quiz` (directă):**

    - Fiecare încercare de quiz (`QuizAttempt`) este direct legată de un singur quiz (`Quiz`), ceea ce înseamnă că pentru fiecare încercare există exact un quiz specific. Aceasta este o relație de tipul one-to-one, unde fiecare încercare indică clar la care quiz corespunde.

4. **Interacțiunile cu `QuizManager`:**
    - `QuizManager` acționează ca un intermediar între utilizatori (`User`) și quiz-uri (`Quiz`), neavând o relație de stocare directă cu acestea, ci mai degrabă le manipulează prin metodele sale. Rolul său este de a aloca quiz-uri utilizatorilor, de a urmări progresul și scorurile, și de a gestiona disponibilitatea quiz-urilor. Este centrul de coordonare care facilitează interacțiunile dintre utilizatori și quiz-urile pe care le încearcă sau le-au completat.

<img src="./Problem 2/images/diagram/QuizClassDiagram.jpg" alt="Class Diagram" width="500"/>
<br>

### Fluxul de Date pentru Aplicația Quiz (Happy Path)

#### 1. **Începerea Quiz-ului**

-   **Utilizatorul Accesează Aplicația**: Utilizatorul deschide interfața web a aplicației de quiz.
-   **Crearea Sesiunii de Quiz**: Sistemul inițiază o nouă sesiune de quiz pentru utilizator, stocând informații de bază (de exemplu, ID-ul utilizatorului, timestamp-ul de începere).

#### 2. **Selectarea Întrebărilor**

-   **Alegerea Random a Întrebărilor**: Algoritmul selectează aleatoriu o întrebare din baza de date, asigurându-se că nu se repetă întrebările deja răspunse.
-   **Încărcarea Întrebării și Opțiunilor**: Întrebarea împreună cu cele patru opțiuni de răspuns sunt încărcate în interfața utilizatorului.

#### 3. **Interacțiunea Utilizatorului**

-   **Selecția Răspunsului**: Utilizatorul selectează un răspuns din opțiunile disponibile.
-   **Trimiterea Răspunsului**: Răspunsul ales este trimis înapoi la server pentru evaluare.

#### 4. **Evaluarea Răspunsului și Scorul**

-   **Verificarea Răspunsului**: Serverul verifică dacă răspunsul ales este corect sau greșit.
-   **Actualizarea Scorului**: Scorul utilizatorului este actualizat pe baza răspunsului - puncte adăugate pentru un răspuns corect și nicio schimbare pentru un răspuns greșit.
-   **Stocarea Răspunsului**: Răspunsul utilizatorului și starea întrebării curente (răspuns corect/greșit) sunt stocate în baza de date.

#### 5. **Continuarea Quiz-ului**

-   **Următoarea Întrebare**: Sistemul alege următoarea întrebare aleatoriu, repetând pașii 2-4 până când toate întrebările au fost răspunse sau până când utilizatorul decide să încheie quiz-ul.

#### 6. **Finalizarea Quiz-ului**

-   **Încheierea Sesiunii**: Odată ce toate întrebările au fost răspunse sau utilizatorul alege să încheie, sesiunea de quiz se termină.
-   **Afișarea Scorului Final**: Scorul final al utilizatorului este calculat și afișat pe interfață.
-   **Salvarea Rezultatelor**: Rezultatele complete ale quiz-ului (întrebări, răspunsuri alese, scor) sunt salvate în baza de date.

### Descrierea Tabelelor

#### Tabelul `Question`

-   **Atribute**:
    -   `questionId`: Este cheia primară a tabelului și identificatorul unic pentru fiecare întrebare. Este o valoare autoincrementată, asigurând că fiecare întrebare adăugată primește un număr unic automat.
    -   `questionText`: Un șir de caractere care stochează textul întrebării. Acest câmp este obligatoriu și nu poate fi lăsat necompletat.
    -   `correctAnswer`: Un șir de caractere care stochează răspunsul corect la întrebare. Este obligatoriu pentru fiecare înregistrare a întrebării.

#### Tabelul `QuestionOption`

-   **Atribute**:
    -   `optionId`: Cheia primară a tabelului și identificatorul unic pentru fiecare opțiune de răspuns.
    -   `questionId`: O cheie străină care face referire la `questionId` din tabelul `Question`, indicând întrebarea căreia îi aparține opțiunea. Acest câmp este obligatoriu.
    -   `optionText`: Un șir de caractere care stochează textul opțiunii de răspuns. Este obligatoriu pentru fiecare înregistrare a opțiunii.

#### Tabelul `Quiz`

-   **Atribute**:
    -   `quizId`: Cheia primară a tabelului și identificatorul unic pentru fiecare quiz.
    -   `currentQuestionIndex`: Un întreg care indică indexul întrebării curente în cadrul quiz-ului. Începe de la 0 și se actualizează pe măsură ce utilizatorul avansează prin întrebări.
    -   `userScore`: Un întreg care reprezintă scorul curent al utilizatorului pentru quiz-ul respectiv. Începe de la 0 și se actualizează pe măsură ce utilizatorul răspunde corect la întrebări.

#### Tabelul `QuizQuestion`

-   **Atribute**:
    -   `id`: Cheia primară a tabelului și identificatorul unic pentru fiecare asociere întrebare-quiz.
    -   `quizId`: O cheie străină care face referire la `quizId` din tabelul `Quiz`, legând quiz-ul de întrebările sale.
    -   `questionId`: O cheie străină care face referire la `questionId` din tabelul `Question`, legând întrebarea de quiz-urile în care este inclusă.

#### Tabelul `User`

-   **Atribute**:
    -   `userId`: Cheia primară a tabelului și identificatorul unic pentru fiecare utilizator.
    -   `username`: Un șir de caractere care stochează numele de utilizator. Este obligatoriu și trebuie să fie unic pentru fiecare utilizator.

#### Tabelul `QuizAttempt`

-   **Atribute**:
    -   `attemptId`: Cheia primară a tabelului și identificatorul unic pentru fiecare încercare de quiz făcută de utilizator.
    -   `quizId`: O cheie străină care face referire la `quizId` din tabelul `Quiz`, indicând quiz-ul la care se referă încercarea.
    -   `userId`: O cheie străină care face referire la `userId` din tabelul `User`, indicând utilizatorul care face încercarea de quiz.
    -   `score`: Un întreg care reprezintă scorul obținut de utilizator în încercarea respectivă.
    -   `completed`: Un boolean care indică dacă utilizatorul a completat sau nu quiz-ul.
    -   `timestamp`: Data și ora când a fost făcută încercarea de quiz, înregistrate cu precizie.

### Descriere Relații dintre Tabele

-   **Question - QuestionOption**:

    -   Relația one-to-many între `Question` și `QuestionOption` este stabilită prin `questionId`. O întrebare (`Question`) poate avea multiple opțiuni de răspuns (`QuestionOption`) asociate cu ea, dar fiecare opțiune de răspuns se referă la o singură întrebare.

-   **Quiz - QuizQuestion**:

    -   Relația one-to-many între `Quiz` și `QuizQuestion` este stabilită prin `quizId`. Un quiz (`Quiz`) poate include multiple asociere cu întrebări (`QuizQuestion`), dar fiecare asociere de întrebare se referă la un singur quiz.

-   **Question - QuizQuestion**:

    -   De asemenea, există o relație one-to-many între `Question` și `QuizQuestion` stabilită prin `questionId`. Acest lucru înseamnă că o întrebare poate fi inclusă în mai multe quiz-uri diferite, dar fiecare legătură din `QuizQuestion` indică spre o singură întrebare din `Question`.

-   **User - QuizAttempt**:

    -   Relația one-to-many între `User` și `QuizAttempt` este stabilită prin `userId`. Un utilizator (`User`) poate efectua mai multe încercări de quiz (`QuizAttempt`), dar fiecare încercare de quiz se referă la un singur utilizator.

-   **Quiz - QuizAttempt**:
    -   Există și o relație one-to-many între `Quiz` și `QuizAttempt` prin `quizId`. Un quiz poate fi încercat de mai multe ori, fiecare încercare (`QuizAttempt`) fiind asociată cu un singur quiz.

#### Codul SQL pentru Taberele

```sql
CREATE TABLE Question (
    questionId INT AUTO_INCREMENT PRIMARY KEY,
    questionText VARCHAR(255) NOT NULL,
    correctAnswer VARCHAR(255) NOT NULL
);

CREATE TABLE QuestionOption (
    optionId INT PRIMARY KEY,
    questionId INT NOT NULL,
    optionText VARCHAR(255) NOT NULL,
    FOREIGN KEY (questionId) REFERENCES Questions(questionId)
);

CREATE TABLE Quiz (
    quizId INT PRIMARY KEY,
    currentQuestionIndex INT NOT NULL DEFAULT 0,
    userScore INT NOT NULL DEFAULT 0
);

CREATE TABLE QuizQuestion (
    id INT PRIMARY KEY,
    quizId INT,
    questionId INT,
    FOREIGN KEY (quizId) REFERENCES Quiz(quizId),
    FOREIGN KEY (questionId) REFERENCES Questions(questionId)
);

CREATE TABLE User (
    userId INT PRIMARY KEY,
    username VARCHAR(255) NOT NULL
    -- Alte atribute ale utilizatorului, dacă este necesar
);

CREATE TABLE QuizAttempt (
    attemptId INT PRIMARY KEY,
    quizId INT NOT NULL,
    userId INT NOT NULL,
    score INT NOT NULL,
    completed BOOLEAN NOT NULL,
    timestamp DATETIME NOT NULL,
    FOREIGN KEY (quizId) REFERENCES Quiz(quizId),
    FOREIGN KEY (userId) REFERENCES User(userId)
);
```
<img src="./Problem 2/images/diagram/QuizDbDiagram.jpg" alt="Db Diagram" width="500"/>
<br>