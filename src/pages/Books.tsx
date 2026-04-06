import { useContext } from "react"
import { useNavigate } from "react-router"
import { Navigation } from "../components/Navigation"

import { BooksContext } from "../contexts/BooksContext"

export function Books() {

	const books = useContext( BooksContext )

	const navigate = useNavigate()

	return (
		<>
			<Navigation />

			<ul className="books">
				{
					books.map( book => ( <li key={ book.id }>
						<button
							onClick={ () => navigate( `/books/${ book.id }` ) }
						>{ book.name }</button>
					</li> ) )
				}
			</ul>
		</>
	)
}
