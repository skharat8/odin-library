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

function showAddBookModal(e) {
  dialog.showModal();
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
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
}

function displayAllBooks() {
  myLibrary.forEach(book => {
    console.log(book);
  });
}

addBookToLibrary("The Hobbit", "Tolkien", 295, false);
addBookToLibrary("The GE", "asa", 35, true);
addBookToLibrary("The ASFAFA", "www", 311, false);

const addBookModalButton = document.querySelector(".add-book-modal");
addBookModalButton.addEventListener("click", showAddBookModal);

const dialog = document.querySelector("dialog");
dialog.addEventListener("click", closeAddBookModal);

const addBookButton = document.querySelector(".add-book");
addBookButton.addEventListener("click", addBookToLibrary);
