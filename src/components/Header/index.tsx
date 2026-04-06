import { useRef, useContext } from "react"

import { TodoContext } from "../../contexts/TodoContext"
import { LanguageContext } from "../../contexts/LanguageContext"
import { T } from "../../T.ts"

export function Header() {

	const inputRef = useRef()
	const [ , setTodos ] = useContext( TodoContext )
	const [ language ] = useContext( LanguageContext )

	const onSubmit = e => {

		e.preventDefault()

		const newTodo = {
			id: Math.random(),
			name: inputRef.current.value,
		}

		setTodos( todos => [ ...todos, newTodo ] )

		inputRef.current.value = null
	}

	return (
		<header>
			<form onSubmit={ onSubmit }>
				<div>
					<input ref={ inputRef } placeholder={ T[ language ].inputPlaceholder } />
					<button>{ T[ language ].buttonAdd }</button>
				</div>
			</form>
		</header>
	)
}
