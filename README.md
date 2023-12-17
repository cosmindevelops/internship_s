## Internship Problems

## Table of Contents

1. [Solution 1](#solution-1)
2. [Solution 2](#solution-2)

## Solution 1:

**Task 1:**

**Diagrama de clasă**

Diagrama de clasă prezintă designul sistemului de gestionare a bibliotecii, construit cu ajutorul framework-ului Entity Framework. Ea evidențiază modul în care obiectele din sistem sunt interconectate și respectă constrângerile de integritate a datelor, cum ar fi cheile străine și relațiile one-to-many.

**Clasa `Book`**
Conține informații despre cărțile disponibile în bibliotecă. Atributele precum `BookId`, `Title`, `Author`, `ISBN`, și `Quantity` reprezintă caracteristicile cărții și sunt accesibile public pentru a permite manipularea lor. Proprietatea `BorrowingRecords` este o colecție care urmărește împrumuturile asociate cu o carte, ilustrând o relație one-to-many între `Book` și `BorrowingRecord`. Metoda `IsAvailable` furnizează o modalitate de a verifica rapid disponibilitatea cărții pentru împrumut.

**Clasa `Patron`**
Definește utilizatorii bibliotecii și stochează informații precum `PatronId`, `Name`, și `ContactInformation`. Similar cu clasa `Book`, `Patron` are o proprietate `BorrowingRecords` care înregistrează împrumuturile utilizatorului, subliniind din nou o relație one-to-many între `Patron` și `BorrowingRecord`.

**Clasa `BorrowingRecord`**
Servește ca legătura care leagă cărțile și utilizatorii, înregistrând fiecare tranzacție de împrumut. Atributele sale furnizează un istoric al fiecărui împrumut, inclusiv datele de împrumut și returnare.

**Clasa `LibraryManager`**
Coordonează funcționalitățile sistemului de gestionare a bibliotecii și acționează ca o interfață pentru operațiile principale. Ea nu este direct mapată la o tabelă în baza de date, ci este responsabilă pentru orchestrarea interacțiunilor dintre obiecte. Metodele sale, cum ar fi `SearchBooks`, `AddBook`, `RemoveBook`, `GetMostBorrowedBooks`, și `GetBorrowingHistory`, oferă funcționalitățile necesare pentru căutarea în colecția de cărți, gestionarea inventarului și generarea de rapoarte.

<img src="./Problem 1/images/ClassDiagram.jpg" alt="Class Diagram" width="500"/>
<br>

**Task 2:**

Fiecare carte (`Book`) poate avea zero sau mai multe înregistrări de împrumut (`BorrowingRecord`) asociate cu ea, ceea ce indică că o carte poate fi împrumutată de mai multe ori. Aceasta este o relație de tipul one-to-many, care este reprezentată prin cheia străină `BookId` în tabelul `BorrowingRecord`.

Fiecare utilizator (`Patron`) poate avea, de asemenea, zero sau mai multe înregistrări de împrumut, reflectând faptul că un utilizator poate împrumuta mai multe cărți. Acesta este un alt exemplu de relație one-to-many, reprezentată prin cheia străină `PatronId` în tabelul `BorrowingRecord`.

Tabelul `BorrowingRecord` funcționează ca un tabel de legătură între `Books` și `Patrons`, stocând detalii despre fiecare împrumut, cum ar fi `BorrowedDate`, `DueDate`, și `ReturnedDate`. Aceasta permite înregistrarea istoricului tranzacțiilor de împrumut între utilizatori și cărți.

**Codul SQL pentru cele 3 tabele**

```sql
CREATE TABLE Books (
    BookId INT PRIMARY KEY IDENTITY,
    Title NVARCHAR(255),
    Author NVARCHAR(255),
    ISBN NVARCHAR(20),
    Quantity INT
);

CREATE TABLE Patrons (
    PatronId INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(255),
    ContactInformation NVARCHAR(255)
);

CREATE TABLE BorrowingRecords (
    BorrowingRecordId INT PRIMARY KEY IDENTITY,
    BookId INT,
    PatronId INT,
    BorrowedDate DATETIME,
    DueDate DATETIME,
    ReturnedDate DATETIME NULL,
    FOREIGN KEY (BookId) REFERENCES Books(BookId),
    FOREIGN KEY (PatronId) REFERENCES Patrons(PatronId)
);
```

<img src="./Problem 1/images/DbSchema.jpg" alt="Db Schema" width="500"/>
<br>

## Solution 2:
