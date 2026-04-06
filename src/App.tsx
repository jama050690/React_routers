import "./App.css"
import { useState, useEffect } from "react"

async function getCounts() {

	return {
		books: {
			all: 100,
			science: 20,
		},
		computers: {
			all: 100,
		}
	}
}

function Pagination( { countOfButtons, countOfPages, currentPage, onChange } ) {

	countOfButtons = Math.min( countOfButtons, Math.ceil( countOfPages / 2 - 1 ) )

	return (
		<ul className="pagination">
			<li>
				<button
					disabled={ currentPage - countOfButtons < 1 }
					onClick={ () => onChange( currentPage - 1 ) }
				>
					Aqa
				</button>
			</li>
			{
				new Array( countOfButtons * 2 + 1 ).fill( 0 ).map( ( _, i ) => (
					<li key={ i }>
						<button
							className={
								currentPage - countOfButtons + i === currentPage ? "current" : null
							}
							onClick={ () => {

								onChange( currentPage - countOfButtons + i )
							} }
						>{ currentPage - countOfButtons + i }</button>
					</li>
				) )
			}
			<li>
				<button
					onClick={ () => onChange( currentPage + 1 ) }
				>
					baqa
				</button>
			</li>
		</ul>
	)
}

export function App() {

	const [ isLoading, setIsLoading ] = useState( true )
	const [ category, setCategory ] = useState( "0" )
	const [ count, setCount ] = useState( "1" )
	const [ page, setPage ] = useState( 1 )
	const [ countOfPages, setCountOfPages ] = useState( 0 )
	const [ books, setBooks ] = useState( [] )

	useEffect( () => {

		( async () => {

			const counts = await getCounts()

			setCountOfPages( Math.ceil( counts.books / count ) )

		} )()

	}, [ count ] )

	useEffect( () => {

		const query = new URLSearchParams( {
			category,
			count,
			page,
		} )

		fetch( `http://localhost:3100/books?${ query.toString() }` )
			.then( response => response.json() )
			.then( books => {

				setBooks( books )

				setIsLoading( false )
			} )

	}, [ category, count, page ] )

	return (
		<div id="app">

			<div className="inputs">
				<select
					defaultValue={ category }
					onChange={ evt => {

						setCategory( evt.target.value )
						setPage( 1 )
					} }
				>
					<option value="0">All</option>
					<option value="1">Fiction</option>
					<option value="2">Science</option>
					<option value="3">History</option>
					<option value="4">Technology</option>
					<option value="5">Philosophy</option>
					<option value="6">Business</option>
					<option value="7">Fantasy</option>
					<option value="8">Mystery</option>
					<option value="9">Romance</option>
					<option value="10">Biography</option>
				</select>

				<select
					defaultValue={ count }
					onChange={ evt => setCount( evt.target.value ) }
				>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>
			</div>

			{ isLoading && <div className="loader"></div> }

			{
				books.length > 0 && (
					<ul className="books">
						{
							books.map( book => ( <li key={ book.id }>
								<p>{ book.name }</p>
								<p className="category">{ book.category_name }</p>
							</li> ) )
						}
					</ul>
				)
			}

			{
				!books.length && <>No data</>
			}

			<Pagination
				countOfPages={ 20 }
				countOfButtons={ 2 }
				currentPage={ page }
				onChange={ page => setPage( page ) }
			/>

			<button className="loadMore" onClick={ () => setPage( page + 1 ) }>Load more ({ page })</button>

		</div>
	)
}
