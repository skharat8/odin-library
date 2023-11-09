const myLibrary = [];

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  get info() {
    let info =
      this.title + " by " + this.author + ", " + this.pages + " pages, ";
    info += isRead ? "read" : "not read yet";
    return info;
  }

  toggleReadStatus(e) {
    if (e.target.textContent === "Read") {
      e.target.style.backgroundColor = "firebrick";
      e.target.textContent = "Not Read";
    } else {
      e.target.style.backgroundColor = "seagreen";
      e.target.textContent = "Read";
    }

    this.isRead = !this.isRead;
  }
}

const displayController = (function () {
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
    createBookCard(book, myLibrary.length - 1);
  }

  function showAllBooks() {
    myLibrary.forEach((book, index) => {
      createBookCard(book, index);
    });
  }

  function createBookCard(book, libraryIndex) {
    // Create new HTML elements
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.dataset.id = libraryIndex;

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
    readButton.style.transition = "all 0.4s ease-in";

    if (book.isRead) {
      readButton.style.backgroundColor = "seagreen";
    } else {
      readButton.style.backgroundColor = "firebrick";
    }

    readButton.addEventListener("click", book.toggleReadStatus.bind(book));
    removeButton.addEventListener("click", removeBook);

    // Attach elements to the DOM
    bookCard.appendChild(titleElement);
    bookCard.appendChild(authorElement);
    bookCard.appendChild(pagesElement);
    actionsDiv.appendChild(readButton);
    actionsDiv.appendChild(removeButton);
    bookCard.appendChild(actionsDiv);

    booksContainer.appendChild(bookCard);
  }

  function removeBook(e) {
    const idToRemove = parseInt(
      e.target.parentElement.parentElement.dataset.id
    );
    const bookCard = document.querySelector(
      `.book-card[data-id="${idToRemove}"]`
    );

    bookCard.remove();
    for (let i = idToRemove + 1; i < myLibrary.length; ++i) {
      const bookCard = document.querySelector(`.book-card[data-id="${i}"]`);
      bookCard.dataset.id -= 1;
    }

    myLibrary.splice(idToRemove, 1);
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

  return { showAllBooks };
})();

// Add some default books to the library
const defaultBook1 = new Book("The Hobbit", "Tolkien", 295, false);
const defaultBook2 = new Book("Dune", "Frank Herbert", 658, false);
const defaultBook3 = new Book("The Big Four", "Agatha Christie", 272, true);

myLibrary.push(defaultBook1, defaultBook2, defaultBook3);
displayController.showAllBooks();
