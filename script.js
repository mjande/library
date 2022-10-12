let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
  }
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  return newBook
}

function displayBooks () {
  myLibrary.forEach((book) => {
    addBookToDisplay(book);
  })
}

function addBookToDisplay(book) {
  const booksContainer = document.querySelector(".books");
  const template = document.getElementById("book-template");
  let newCard = template.content.firstElementChild.cloneNode(true);

  newCard.querySelector("#title").textContent = book.title;
  newCard.querySelector("#author").textContent = `Written by ${book.author}`;
  newCard.querySelector("#pages").textContent = `${book.pages} pages`;
  newCard.querySelector("#read").textContent = (book.read ? "Read" : "Not Read");

  const readButton = newCard.querySelector("#read-button");

  if (book.read) {
    readButton.textContent = "Not Read"
  } else {
    readButton.textContent = "Read"
  }

  readButton.addEventListener("click", toggleReadStatus);

  let index = myLibrary.findIndex((entry) => {
    return entry == book;
  });

  newCard.dataset.index = index;
  newCard.querySelector('button').dataset.index = index;
  readButton.dataset.index = index;

  newCard.querySelector("button").addEventListener("click", deleteBook);

  booksContainer.appendChild(newCard);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 234, true);
addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 260, true);
addBookToLibrary("Dune", "Frank Herbert", 652, true);
displayBooks();

function showForm() {
  const form = document.querySelector(".new-book-form");
  const button = document.getElementById("new-book-button");

  form.classList.remove("hidden");
  button.className = "hidden";
}


// Form script
const form = document.querySelector(".new-book-form");
form.addEventListener('submit', (event) => {
  event.preventDefault()
  
  let newBookTitle = document.querySelector("#new-book-title").value;
  let newBookAuthor = document.querySelector("#new-book-author").value;
  let newBookPages = document.querySelector("#new-book-pages").value;
  let newBookRead = document.querySelector("#new-book-read").value

  const newBook = addBookToLibrary(newBookTitle, newBookAuthor, newBookPages, newBookRead);
  
  addBookToDisplay(newBook);

  form.reset();
  form.classList.add("hidden");

  const button = document.getElementById("new-book-button");
  button.className = "";
});

// Delete book
function deleteBook(event) {
  const index = event.currentTarget.dataset.index;
  myLibrary.splice(index, 1);

  const bookCard = document.querySelector(`[data-index="${index}"].book`)
  bookCard.remove();
}

function toggleReadStatus(event) {
  const index = event.currentTarget.dataset.index;
  const book = myLibrary[index];
  const bookCard = document.querySelector(`[data-index="${index}"].book`)

  book.read = book.read ? false : true;
  bookCard.querySelector("#read").textContent = book.read ? "Read" : "Not Read";
  event.currentTarget.textContent = book.read ? "Not Read" : "Read"
}