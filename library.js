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

/**
 * 
 * @param {string} bookID contains a string of the form "book-#", where # is an integer
 * 
 * This function searches the library for the book and removes it from the array.
 */
function deleteBookFromLibrary(id) {
    console.log(`Removing book ID#${id}`);
    myLibrary.splice(id, 1);
}

function refreshBookDisplay() {
    let bookDiv, div, img, span;
    const toggleOnURL = "images/toggle-switch.png";
    const toggleOffURL = "images/toggle-switch-off.png";
    let display = document.querySelector("#bookDisplay");
    display.replaceChildren();  // Empty what's there
    myLibrary.forEach((book, index) => {
        bookID = "book-" + index;
        bookDiv = document.createElement("div")
        bookDiv.classList.add("book");
        bookDiv.id = bookID;
        div = document.createElement("div");
        div.classList.add("bookTitle");
        div.textContent = book.title;
        bookDiv.appendChild(div);
        div = document.createElement("div");
        div.classList.add("bookAuthor");
        div.textContent = book.author;
        bookDiv.appendChild(div);
        div = document.createElement("div");
        div.classList.add("bookPages");
        div.textContent = book.pages + " pages";
        bookDiv.appendChild(div);
        div = document.createElement("div");
        div.classList.add("bookReadStatus");
        span = document.createElement("span");
        span.id = `read-${index}`;
        img = document.createElement("img");
        img.classList.add("toggle");
        img.id = `toggle-${index}`;
        if (book.haveRead) {
            span.textContent = "Read";
            img.src = toggleOnURL;
        } else {
            span.textContent = "Not Read";
            img.src = toggleOffURL;
        }
        img.addEventListener("click", () => {
            image = document.getElementById(`toggle-${index}`);
            if (image.src.endsWith(toggleOnURL)) {
                myLibrary[index].haveRead = false;
                image.src = toggleOffURL;
                s = document.querySelector(`#read-${index}`);
                s.textContent = "Not Read";
            } else if (image.src.endsWith(toggleOffURL)) {
                myLibrary[index].haveRead = true;
                image.src = toggleOnURL;
                s = document.querySelector(`#read-${index}`);
                s.textContent = "Read";
            } else {
                console.log("No source found");
            }
        })
        div.appendChild(span);
        div.appendChild(img);
        bookDiv.appendChild(div);
        img = document.createElement("img");
        img.src = "images/trash-can-outline.png";
        img.alt = "Delete book";
        img.title = "Delete book";
        img.id = "delete-" + index;
        img.addEventListener("click", () => {
            deleteBookFromLibrary(index);
            refreshBookDisplay();
        })
        bookDiv.appendChild(img);
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