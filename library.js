const dialog = document.querySelector("dialog");
dialog.setAttribute("data-dialog-type", "add");
const saveButton = document.querySelector("dialog button#save");
const cancelButton = document.querySelector("dialog button#cancel");
const addBookButton = document.querySelector("#addBook");

class Book {
    constructor(title, author, pages, haveRead) {
        this._title = title;
        this._author = author;
        this._pages = pages;
        this._haveRead = haveRead;
        this.isReadMessage = function () {
            if (this._haveRead) {
                return "Has been read";
            } else {
                return "Has not been read";
            }
        }
        this.info = function () {
            console.log(`${this._title} by ${this._author}, ${this._pages} pages, ${this._isReadMessage()}\n`);
        };
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }

    get author() {
        return this._author;
    }
    set author(value) {
        this._author = value;
    }

    get pages() {
        return this._pages;
    }
    set pages(value) {
        this._pages = value;
    }

    get haveRead() {
        return this._haveRead;
    }
    set haveRead(value) {
        this._haveRead = value;
    }
}

class Library {


    myLibrary = [];

    get myLibrary() {
        return this.myLibrary;
    }


    /**
     *  constructor: For development purposes to have a canned set of books
     *  already in the library. When database functionality gets added, this
     *  function can pull from the database to initialize the page.
     */
    constructor() {
        let book;
        book = new Book("The Hobbit", "J.R.R. Tolkien", 300, true);
        this.myLibrary.push(book);
        book = new Book("Just Mercy", "Bryan Stevenson", 456, true);
        this.myLibrary.push(book);
        book = new Book("Pride and Prejudice", "Jane Austen", 345, false);
        this.myLibrary.push(book);
        book = new Book("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 159, true);
        this.myLibrary.push(book);
        book = new Book("Miss Peregrine's Home for Peculiar Children", "Ransom Riggs and Jesse Bernstein", 352, false);
        this.myLibrary.push(book);
    }



    addBookToLibrary() {
        let title, author, pages, haveRead;
        title = document.querySelector('#title').value;
        author = document.querySelector('#author').value;
        pages = document.querySelector('#pages').value;
        haveRead = document.querySelector('#haveRead').checked;
        book = new Book(title, author, pages, haveRead);
        this.myLibrary.push(book);
    }

    editBookInLibrary(id) {
        console.log(`Editing book #${id}`);
        let title, author, pages, haveRead;
        title = document.querySelector('#title').value;
        author = document.querySelector('#author').value;
        pages = document.querySelector('#pages').value;
        haveRead = document.querySelector('#haveRead').checked;
        this.myLibrary[id].title = title;
        this.myLibrary[id].author = author;
        this.myLibrary[id].pages = pages;
        this.myLibrary[id].haveRead = haveRead;
    }

    /**
     * 
     * @param {string} bookID contains a string of the form "book-#", where # is an integer
     * 
     * This function searches the library for the book and removes it from the array.
     */
    deleteBookFromLibrary(id) {
        console.log(`Removing book ID#${id}`);
        this.myLibrary.splice(id, 1);
    }
}

const library = new Library();

function refreshBookDisplay() {
    let bookDiv, div, img, span;
    const toggleOnURL = "images/toggle-switch.png";
    const toggleOffURL = "images/toggle-switch-off.png";
    let display = document.querySelector("#bookDisplay");
    display.replaceChildren();  // Empty what's there
    library.myLibrary.forEach((book, index) => {
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
                library.myLibrary[index].haveRead = false;
                image.src = toggleOffURL;
                s = document.querySelector(`#read-${index}`);
                s.textContent = "Not Read";
            } else if (image.src.endsWith(toggleOffURL)) {
                library.myLibrary[index].haveRead = true;
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

        div = document.createElement("div");
        div.classList.add("action-images");
        img = document.createElement("img");
        img.src = "images/pencil.png";
        img.alt = "Edit book";
        img.title = "Edit book";
        img.id = `edit-${index}`;
        img.addEventListener("click", () => {
            dialog.setAttribute("data-dialog-type", "edit");
            dialog.setAttribute("data-dialog-book-id", index);
            document.querySelector("#title").value = library.myLibrary[index].title;
            document.querySelector("#author").value = library.myLibrary[index].author;
            document.querySelector("#pages").value = library.myLibrary[index].pages;
            document.querySelector("#haveRead").checked = library.myLibrary[index].haveRead;
            dialog.showModal();
        })
        div.appendChild(img);
        img = document.createElement("img");
        img.src = "images/trash-can-outline.png";
        img.alt = "Delete book";
        img.title = "Delete book";
        img.id = "delete-" + index;
        img.addEventListener("click", () => {
            library.deleteBookFromLibrary(index);
            refreshBookDisplay();
        })
        div.appendChild(img);
        bookDiv.appendChild(div);
        display.appendChild(bookDiv);
    });
}

function clearDialog() {
    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#pages').value = "";
    document.querySelector('#haveRead').checked = false;  
    dialog.setAttribute("data-dialog-bookid", "");  
}




cancelButton.addEventListener("click", () => {
    dialog.close();
    clearDialog();
    console.log("Closed");
});

saveButton.addEventListener("click", () => {
    dialog.close();
    if (dialog.getAttribute("data-dialog-type") == "add") {
        library.addBookToLibrary();
    } else if (dialog.getAttribute("data-dialog-type") == "edit") {
        library.editBookInLibrary(dialog.getAttribute("data-dialog-book-id"));
    }
    refreshBookDisplay();
    clearDialog();
    console.log("Saved\n");
} );

addBookButton.addEventListener("click", () => {
    dialog.setAttribute("data-dialog-type", "add");
    dialog.showModal();
});



refreshBookDisplay();
