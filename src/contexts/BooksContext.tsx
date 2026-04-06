import { createContext } from "react";

export interface Book {
  id: number;
  name: string;
}

export interface BooksContextType {
  books: Book[];
  addBook: (newBook: Omit<Book, "id">) => void;
}

export const BooksContext = createContext<BooksContextType | undefined>(
  undefined
);
