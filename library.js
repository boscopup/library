const myLibrary = [];

/**
 *  populateLibrary: For development purposes to have a canned set of books
 *  already in the library. When database functionality gets added, this
 *  function can pull from the database to initialize the page.
 */
function populateLibrary() {
    let book;
    book = new Book("The Hobbit", "J.R.R. Tolkien", 300, true);
    myLibrary.push(book);
    book = new Book("Just Mercy", "Bryan Stevenson", 456, true);
    myLibrary.push(book);
    book = new Book("Pride and Prejudice", "Jane Austen", 345, false);
    myLibrary.push(book);
    book = new Book("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 159, true);
    myLibrary.push(book);
    book = new Book("Miss Peregrine's Home for Peculiar Children", "Ransom Riggs and Jesse Bernstein", 352, false);
    myLibrary.push(book);
}

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.isReadMessage = function () {
        if (this.haveRead) {
            return "Has been read";
        } else {
            return "Has not been read";
        }
    }
    this.info = function () {
        console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.isReadMessage()}\n`);
    };
}

function addBookToLibrary() {
    let title, author, pages, haveRead;
    title = document.querySelector('#title').value;
    author = document.querySelector('#author').value;
    pages = document.querySelector('#pages').value;
    haveRead = document.querySelector('#haveRead').checked;
    book = new Book(title, author, pages, haveRead);
    myLibrary.push(book);
}

function refreshBookDisplay() {
    let bookDiv, p;
    let display = document.querySelector("#bookDisplay");
    display.replaceChildren();  // Empty what's there
    myLibrary.forEach(book => {
        bookDiv = document.createElement("div")
        bookDiv.classList.add("book");
        p = document.createElement("p");
        p.classList.add("bookTitle");
        p.textContent = book.title;
        bookDiv.appendChild(p);
        p = document.createElement("p");
        p.classList.add("bookAuthor");
        p.textContent = book.author;
        bookDiv.appendChild(p);
        p = document.createElement("p");
        p.classList.add("bookPages");
        p.textContent = book.pages + " pages";
        bookDiv.appendChild(p);
        p = document.createElement("p");
        p.classList.add("bookReadStatus");
        if (book.haveRead) {
            p.textContent = "Have read";
        } else {
            p.textContent = "Have not read";
        }
        bookDiv.appendChild(p);
        display.appendChild(bookDiv);
    });
}

function clearDialog() {
    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#pages').value = "";
    document.querySelector('#haveRead').checked = false;    
}


const dialog = document.querySelector("dialog");
const saveButton = document.querySelector("dialog button#save");
const cancelButton = document.querySelector("dialog button#cancel");

const addBookButton = document.querySelector("#addBook");

cancelButton.addEventListener("click", () => {
    dialog.close();
    clearDialog();
    console.log("Closed");
});

saveButton.addEventListener("click", () => {
    dialog.close();
    addBookToLibrary();
    refreshBookDisplay();
    clearDialog();
    console.log("Saved\n");
} );

addBookButton.addEventListener("click", () => {
    dialog.showModal();
});

populateLibrary();
refreshBookDisplay();