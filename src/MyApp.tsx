import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";

import { BooksContext, type Book } from "./contexts/BooksContext";

import { Home } from "./pages/Home";
import { Books } from "./pages/Books";
import { Book as BookPage } from "./pages/Book";
import { About } from "./pages/About";

import booksData from "./data/books";

const BOOKS_STORAGE_KEY = "react-router-books";

function getInitialBooks(): Book[] {
  const savedBooks = localStorage.getItem(BOOKS_STORAGE_KEY);

  if (!savedBooks) {
    return booksData;
  }

  try {
    const parsedBooks = JSON.parse(savedBooks);

    if (
      Array.isArray(parsedBooks) &&
      parsedBooks.every(
        (book) =>
          typeof book?.id === "number" && typeof book?.name === "string"
      )
    ) {
      return parsedBooks;
    }
  } catch {}

  return booksData;
}

export function App() {
  const [books, setBooks] = useState<Book[]>(getInitialBooks);

  useEffect(() => {
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const addBook = (newBook: Omit<Book, "id">) => {
    setBooks((prev) => [
      ...prev,
      {
        id: prev.length > 0 ? Math.max(...prev.map((b) => b.id)) + 1 : 1,
        ...newBook,
      },
    ]);
  };

  return (
    <BooksContext.Provider value={{ books, addBook }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BooksContext.Provider>
  );
}
