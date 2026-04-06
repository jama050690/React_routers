import "./Navigation.css"
import { NavLink, useNavigate } from "react-router"

export function Navigation() {

	const navigate = useNavigate()

	return ( <nav>
		<ul>
			<li>
				<button onClick={ () => navigate( "/" ) }>Home</button>
			</li>
			<li>
				<button onClick={ () => navigate( "/about" ) }>About</button>
			</li>
			<li>
				<button onClick={ () => navigate( "/books" ) }>Books</button>
			</li>
		</ul>
	</nav> )
}
