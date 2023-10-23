const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;

  this.info = function () {
    let info =
      this.title + " by " + this.author + ", " + this.pages + " pages, ";
    info += isRead ? "read" : "not read yet";
    return info;
  };
}

function closeAddBookModal(e) {
  const modalDimensions = modal.getBoundingClientRect();
  if (
    e.clientX < modalDimensions.left ||
    e.clientX > modalDimensions.right ||
    e.clientY < modalDimensions.top ||
    e.clientY > modalDimensions.bottom
  ) {
    modal.close();
  }
}

function addBookToLibrary(e) {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;

  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
  createBookCard(book);
}

function displayAllBooks() {
  myLibrary.forEach(book => {
    createBookCard(book);
  });
}

function createBookCard(book) {
  // Create new HTML elements
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  const titleElement = document.createElement("span");
  const authorElement = document.createElement("span");
  const pagesElement = document.createElement("span");

  const actionsDiv = document.createElement("div");
  const readButton = document.createElement("button");
  const removeButton = document.createElement("button");

  // Specify the text content
  titleElement.textContent = `${book.title}`;
  authorElement.textContent = `by ${book.author}`;
  pagesElement.textContent = `${book.pages} pages`;
  readButton.textContent = book.isRead ? "Read" : "Not Read";
  removeButton.textContent = "Remove";

  // Define the styling for various elements
  actionsDiv.style.display = "flex";
  actionsDiv.style.gap = "1rem";
  titleElement.style.fontWeight = "bold";

  if (book.isRead) {
    readButton.style.backgroundColor = "seagreen";
  } else {
    readButton.style.backgroundColor = "firebrick";
  }

  readButton.addEventListener("click", toggleReadStatus);

  // Attach elements to the DOM
  bookCard.appendChild(titleElement);
  bookCard.appendChild(authorElement);
  bookCard.appendChild(pagesElement);
  actionsDiv.appendChild(readButton);
  actionsDiv.appendChild(removeButton);
  bookCard.appendChild(actionsDiv);

  booksContainer.appendChild(bookCard);
}

function toggleReadStatus(e) {
  if (e.target.textContent === "Read") {
    e.target.style.backgroundColor = "firebrick";
    e.target.textContent = "Not Read";
  } else {
    e.target.style.backgroundColor = "seagreen";
    e.target.textContent = "Read";
  }
}

const form = document.querySelector("#add-book-form");
const modal = document.querySelector("dialog");

const openBookModalButton = document.querySelector(".add-book-modal");
openBookModalButton.addEventListener("click", e => modal.showModal());

modal.addEventListener("click", closeAddBookModal);
modal.addEventListener("close", e => form.reset());

// Add user provided book to the library
const booksContainer = document.querySelector(".books-container");
const addBookButton = document.querySelector("#add-book");
addBookButton.addEventListener("click", addBookToLibrary);

// Add some default books to the library
const defaultBook1 = new Book("The Hobbit", "Tolkien", 295, false);
const defaultBook2 = new Book("Dune", "Frank Herbert", 658, false);
const defaultBook3 = new Book("The Big Four", "Agatha Christie", 272, true);

myLibrary.push(defaultBook1, defaultBook2, defaultBook3);
displayAllBooks();
