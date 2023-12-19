## Internship Problems

## Table of Contents

1. [Solution 1](#solution-1)
2. [Solution 2](#solution-2)

## Solution 1:

# Documentație Sistem de Gestionare a Bibliotecii

## Task 1: Diagrama de Bază de date

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

#### Descriere Relații între Clase

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

## Task 2: Diagrama de Bază de date

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

#### Descriere Relații dintre Tabele

-   **Books - BorrowingRecords**:

    -   Relația one-to-many între `Books` și `BorrowingRecords` este stabilită prin `BookID`. O carte poate avea multiple înregistrări de împrumut asociate cu ea, dar fiecare înregistrare de împrumut se referă la o singură carte.

-   **Patrons - BorrowingRecords**:
    -   Relația one-to-many între `Patrons` și `BorrowingRecords` este stabilită prin `PatronID`. Un patron poate avea mai multe înregistrări de împrumut asociate, dar fiecare înregistrare de împrumut se referă la un singur patron.

### Codul SQL pentru Taberele

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

# Documentația Designului Logic al Aplicației de Quiz

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

## Task 2: Logical Design

## Prezentare Generală

Această documentație descrie implementarea unei Aplicații de Quiz care preia întrebări de la Open Trivia Database API, le procesează și le afișează, și calculează scorurile utilizatorilor.

## Pași Cheie în Implementare

### 1. Extragerea Întrebărilor din API

-   **Proces**: Aplicația inițiază prin efectuarea unui apel către Open Trivia Database API.
-   **Scop**: Pentru a recupera un set diversificat de întrebări de quiz bazate pe parametri specificați, cum ar fi categoria și dificultatea.

### 2. Maparea Răspunsului API în Clasa `Question`

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

### 3. Amestecarea Răspunsurilor

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

### 4. Alegerea unei Întrebări la Întâmplare

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

### 5. Afișarea Întrebărilor și Calculul Scorului

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
