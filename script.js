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

function addBookToLibrary(title, author, pages, isRead) {
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
