import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import MovieContext from "../context/MovieContext";
import Movie from "./Movie";

const Advice = () => {
	const { currentUser } = useContext(MovieContext);
	const [advisedMovies, setAdvisedMovies] = useState([]);

	const getAdvisedMovies = () => {
		const search = new URLSearchParams({ id: currentUser.id }).toString();

		const url = "http://127.0.0.1:5000/getSuggestion?" + search;

		fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data.similarities)
				data.suggestions.movies.forEach(({ movieId }) => {
					const search = new URLSearchParams({ id: movieId }).toString();

					const url = "http://127.0.0.1:5000/movie?" + search;

					fetch(url, {
						method: "GET",
						headers: { "Content-Type": "application/json" },
					})
						.then((res) => res.json())
						.then((data) => {
							console.log(data);
							setAdvisedMovies((prevState) => [
								...prevState,
								{	
									image2: data.image,
									id: data.id,
									genre: data.genre,
									image: `http://127.0.0.1:5000/get_image?fileName=${data.year}`,
									imdb: data.imdb,
									title: data.title,
									year: data.year,
								},
							]);
						});
				});
			});
	};

	useEffect(() => {
		getAdvisedMovies();
	}, []);

	return (
		<>
			<div>
				<div className=" grid grid-cols-7 gap-3 md:grid-cols-5 mt-5">
					{advisedMovies.map((movie, index) => (
						<Movie
							title={movie.title}
							genre={movie.image2}
							image={movie.image}
							year={movie.genre}
							imdb={movie.imdb}
							id={movie.id}
							key={index}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default Advice;
