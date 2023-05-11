import React, { ChangeEvent, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

const Movie = ({ props }: any, key: any, mainPageClickHandler: any) => {
    console.log(props.movie);
    const [movie, setMovie] = useState(props);
    const [mainPageHandler, setMainPageHandler] = useState(mainPageClickHandler);
    const navigate = useNavigate();

    const toMoviePage = () => {
        console.log(movie);
        navigate('/movie', { state: { movie, mainPageHandler } });
    };


    return (
        <div className='image' onClick={toMoviePage} key={key}>
            <img src={props.Poster} alt='movie'></img>
        </div>
    );
};

const MoviesBoard = (props: any) => {
    // console.log(props.genre);
	// console.log(props.productionYear);
	// console.log(props.movies);
	const 
        genre = props.genre,
        productionYear = props.productionYear;
    let filteredMovies = props.movies;

    if (props.genre) {
        filteredMovies = filteredMovies.filter((movie: any, index: any) => {
            return movie.genre.toLowerCase() === genre.toLowerCase();
        })
    }

    if (props.productionYear) {
        filteredMovies = filteredMovies.filter((movie: any, index: any) => {
            return movie.productionYear === productionYear;
        })

    }

	return (
		<>
        {filteredMovies.map((movie: any, index: any) => (
            <Movie props={movie} key={index} mainPageClickHandler={props.mainPageClickHandler}/>
        ))}
		</>
	);
};

export default MoviesBoard;