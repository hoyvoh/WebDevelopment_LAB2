class Book {
  constructor(title, author, isbn, avaiableCopies) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.avaiableCopies = avaiableCopies;
  }
  borrowBook() {
    this.avaiableCopies = this.avaiableCopies - 1;
  }
  returnBook() {
    this.avaiableCopies = this.avaiableCopies + 1;
  }
}

class User {
  constructor(name, userType, borrowedBooks) {
    this.name = name;
    this.userType = userType;
    this.borrowedBooks = borrowedBooks;
  }
  borrow(book) {
    throw new Error(
      "Abstract method 'borrow()' must be implemented by subclasses."
    );
  }

  return(book) {
    const index = this.borrowedBooks.indexOf(book);
    if (index > -1) {
      this.borrowedBooks.splice(index, 1);
      console.log(`${this.name} has returned "${book}".`);
    } else {
      console.log(`${this.name} does not have "${book}" to return.`);
    }
  }
}

class Student extends User {
  constructor(name) {
    super(name, "Student");
  }

  borrow(book) {
    if (this.borrowedBooks.length >= 3) {
      console.log(`Sorry, ${this.name}. You can only borrow up to 3 books.`);
    } else {
      this.borrowedBooks.push(book);
      console.log(`${this.name} (Student) has borrowed "${book}".`);
    }
  }
}

class Teacher extends User {
  constructor(name) {
    super(name, "Teacher");
  }

  borrow(book) {
    if (this.borrowedBooks.length >= 5) {
      console.log(`Sorry, ${this.name}. You can only borrow up to 5 books.`);
    } else {
      this.borrowedBooks.push(book);
      console.log(`${this.name} (Teacher) has borrowed "${book}".`);
    }
  }
}

class Library {
  constructor() {
    this.bookCollection = [];
    this.users = [];
    this.borrowedBooks = new Set();
  }
  addBook(book) {
    if (!this.books.includes(book)) {
      this.books.push(book);
      console.log(`"${book}" added to the library.`);
    } else {
      console.log(`"${book}" is already in the library.`);
    }
  }
  addUser(user) {
    if (!this.users.includes(user)) {
      this.users.push(user);
      console.log(`${user.name} added to the system as a ${user.userType}.`);
    } else {
      console.log(`${user.name} is already in the system.`);
    }
  }
  borrowBook(user, book) {
    if (!this.books.includes(book)) {
      throw new Error(`"${book}" is not available in the library.`);
    }

    if (this.borrowedBooks.has(book)) {
      throw new Error(`"${book}" is currently borrowed by someone else.`);
    }

    try {
      if (user.borrow(book)) {
        this.borrowedBooks.add(book);
        console.log(`${user.name} borrowed "${book}".`);
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  returnBook(user, book) {
    if (user.return(book)) {
      this.borrowedBooks.delete(book);
      console.log(`${user.name} returned "${book}".`);
    } else {
      console.log(`${user.name} does not have "${book}" to return.`);
    }
  }
  listAvailableBooks() {
    const availableBooks = this.books.filter(
      (book) => !this.borrowedBooks.has(book)
    );
    console.log("Available books:");
    availableBooks.forEach((book) => console.log(book));
  }
}
