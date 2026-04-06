import "./App.css"
import { Routes, Route } from "react-router"

import { BooksContext } from "./contexts/BooksContext"

import { Home } from "./pages/Home"
import { Books } from "./pages/Books"
import { Book } from "./pages/Book"
import { About } from "./pages/About"

import books from "./data/books"

export function App() {

	return ( <BooksContext.Provider value={ books }>
		<Routes>
			<Route path="/" element={ <Home /> } />
			<Route path="/books" element={ <Books /> } />
			<Route path="/books/:id" element={ <Book /> } />
			<Route path="/about" element={ <About /> } />
		</Routes>
	</BooksContext.Provider> )
}
