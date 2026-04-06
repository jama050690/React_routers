import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router"
import { Navigation } from "../components/Navigation"

import { BooksContext } from "../contexts/BooksContext"

export function Book() {

	const { id } = useParams()

	const books = useContext( BooksContext )
	const [ book, setBook ] = useState( null )

	function getBookById( id ) {

		return books.find( b => b.id === id ) || null
	}

	useEffect( () => {

		const book = getBookById( id - 0 )

		setBook( book )

	}, [] )

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
