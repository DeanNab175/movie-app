import { useState, useEffect } from 'react'
import './App.css'
import searchIcon from './assets/search.svg'
import MovieCard from './Components/MovieCard'

const API_URL = 'https://www.omdbapi.com/?apikey=10293233'

const App = () => {

	const [movies, setMovies] = useState([])
	const [searchTerm, setSearchTerm] = useState('')

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`)
		const data = await response.json()

		setMovies(data.Search)
	}

	useEffect(() => {
		searchMovies('ninja turtles')
	}, [])

	return (
		<div className="app">
			<h1>MovieLand</h1>

			<div className="search">
				<input 
					placeholder='Search for movies'
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onKeyDown={(e) => e.key === 'Enter' && searchMovies(searchTerm)}
				/>
				<img 
					src={searchIcon} 
					alt="search" 
					onClick={() => searchMovies(searchTerm)}
				/>
			</div>

			{
				movies?.length > 0
				? (
					<div className="container">
						{
							movies.map((movie) => (
								<MovieCard key={movie.imdbID} movie={movie} />
							))
						}
					</div>
				) : (
					<div className="empty">
						<h2>No movies found</h2>
					</div>
				)
			}
			
		</div>
	)
}

export default App
