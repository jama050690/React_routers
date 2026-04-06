import { useContext } from "react";
import { useNavigate } from "react-router";
import { Navigation } from "../components/Navigation";

import { BooksContext } from "../contexts/BooksContext";

export function Books() {
  const booksContext = useContext(BooksContext);

  const navigate = useNavigate();

  if (!booksContext) {
    return null;
  }

  const { books, addBook } = booksContext;

  const handleAddBook = () => {
    addBook({ name: `Book #${books.length + 1}` });
  };

  return (
    <>
      <Navigation />

      <button onClick={handleAddBook}>Add Book</button>

      <ul className="books">
        {books.map((book) => (
          <li key={book.id}>
            <button></button>
            <button onClick={() => navigate(`/books/${book.id}`)}>
              {book.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
