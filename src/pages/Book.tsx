import { useContext } from "react"
import { useParams } from "react-router"
import { Navigation } from "../components/Navigation"

import { BooksContext } from "../contexts/BooksContext"

export function Book() {

	const { id } = useParams()
	const booksContext = useContext( BooksContext )
	const book =
		booksContext?.books.find( currentBook => currentBook.id === Number( id ) ) ?? null

	return (
		<>
			<Navigation />

			{
				book === null && <>No Book</>
			}

			{
				book && (
					<>
						{ book.name }
					</>
				)
			}
		</>
	)
}
