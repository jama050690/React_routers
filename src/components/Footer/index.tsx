import { useContext } from "react"
import { LanguageContext } from "../../contexts/LanguageContext"
import { T } from "../../T.ts"

export function Footer() {

	const [ language, setLanguage ] = useContext( LanguageContext )

	const onChange = e => setLanguage( e.target.value )

	return (
		<footer>
			<p>
				&copy; Copyright 2026. { T[ language ].copyright }
			</p>
			<select
				defaultValue={ language }
				onChange={ onChange }
			>
				<option value="uz">O'zbekcha</option>
				<option value="en">English</option>
			</select>
		</footer>
	)
}
