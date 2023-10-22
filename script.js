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
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
  }
}

function addBookToLibrary(e) {
  const title = document.querySelector("input[id='title']").value;
  const author = document.querySelector("input[id='author']").value;
  const pages = document.querySelector("input[id='pages']").value;
  const isRead = document.querySelector("input[id='isRead']").value;

  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
}

function displayAllBooks() {
  myLibrary.forEach(book => {
    console.log(book);
  });
}

const form = document.querySelector("#add-book-form");
const modal = document.querySelector("dialog");

const addBookModalButton = document.querySelector(".add-book-modal");
addBookModalButton.addEventListener("click", e => modal.showModal());

modal.addEventListener("click", closeAddBookModal);
modal.addEventListener("close", e => form.reset());

// Add user provided book to the library
const addBookButton = document.querySelector("#add-book");
addBookButton.addEventListener("click", addBookToLibrary);

// Add some default books to the library
const defaultBook1 = new Book("The Hobbit", "Tolkien", 295, false);
const defaultBook2 = new Book("Dune", "Frank Herbert", 658, false);
const defaultBook3 = new Book(
  "Peril at End House",
  "Agatha Christie",
  287,
  true
);
myLibrary.push(defaultBook1, defaultBook2, defaultBook3);
