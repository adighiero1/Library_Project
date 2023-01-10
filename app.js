console.log("Hello World!\n==========\n");

// PROJECT Section
console.log("PROJECT:\n==========\n");

// 1. Create a class `Book` that has the following properties:
//    - Title (string)
//    - Author (string)
//    - Read (boolean)

const books = [
  {
    id: 1,
    title: "Name of the Wind",
    author: "Patrick Rothfus",
    read: true,
  },
];
class Book {
  constructor(id, title, author, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

class Library {
  constructor(books) {
    this.nextId = books.length;
    this.books = books; //this will be the array passed in
  }
  addBook() {
    //grabbing the elements from the div
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const read = document.getElementById("read");
    //create an instance of a book.
    this.nextId++; //incrementing book count
    const newBook = new Book(
      this.nextId,
      title.value,
      author.value,
      read.checked
    ); //creating new book
    this.books.push(newBook); //pushing the books.

    //now we need to display to the DOM. create elements and upend them to the right parents.
    // select the table body, create new table row, create three new table cells, append the tds the tr, append the tr to the table body
    const tableBody = document.getElementById("tableBody"); //selecting body
    const newTr = document.createElement("tr"); //creating table row where trs will go
    newTr.classList.add(newBook.id); //assigning the same ID to use for removal
    newTr.addEventListener("dbclick", () => {
      this.removeBook(newBook.id);
    }); //event listener to remove book by double clicking
    const newTitle = document.createElement("td"); //creating tr
    const newAuthor = document.createElement("td"); //creating tr
    const newRead = document.createElement("td"); //creating tr
    // need to add text content to td's with the book values
    newTitle.textContent = title.value;
    newAuthor.textContent = author.value;
    const newCheckbox = document.createElement("input");
    newCheckbox.classList.add(newBook.id);
    newCheckbox.type = "checkbox";
    newCheckbox.checked = read.checked;
    newCheckbox.disabled = read.checked;
    //adding event listener so after you create it, if you check it it is checked and can no longer not read the book, disabling the check mark
    newCheckbox.addEventListener("click", (event) => {
      // calling the method markRead
      this.markRead(event.target, newBook.id); //we set this to the book id
    });
    newRead.appendChild(newCheckbox);

    //appending them
    newTr.appendChild(newTitle);
    newTr.appendChild(newAuthor);
    newTr.appendChild(newRead);
    //now append this to table body.
    tableBody.appendChild(newTr);
  }
  markRead(checkbox, id) {
    //takes in checkbox
    //loop throught the books array

    this.books.forEach((book) => {
      if (id === book.id) {
        book.read = true;

        checkbox.disabled = true; //disable checkbox
      }
    });
  }
  removeBook(bookId) {
    // to remove a book, use ID and loop through
    //reassining the books array after filtering out the book to remove
    this.books.this.books.filter(({ id }) => bookId !== id);
    //after this, you have to remove the book from the dom. you have to remove the table row containing that book

    const tbody = document.getElementById("tableBody"); //selecting table body which is parent of table row.
    tbody.removeChild(document.getElementsByClassName(bookId)[0]);
  }
}
//selecting the form so we can submit
const library = new Library(books); //creating a books library
const form = document.getElementById("form");

//creating event listener for the form

form.addEventListener("submit", (event) => {
  event.preventDefault(); //preventing this from sending infomation, just grab the information.
  library.addBook();
});
