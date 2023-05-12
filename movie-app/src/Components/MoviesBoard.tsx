import React, { ChangeEvent, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

const Movie = ({ props }: any, key: any, mainPageClickHandler: any) => {
    const [movie, setMovie] = useState(props);
    const [mainPageHandler, setMainPageHandler] = useState(mainPageClickHandler);
    const navigate = useNavigate();

    const toMoviePage = () => {
        navigate('/movie', { state: { props, mainPageHandler } });
    };

    return (
        <div className='image' onClick={toMoviePage} key={key}>
            <img src={props.Poster} alt='movie'></img>
        </div>
    );
};

const MoviesBoard = (props: any) => {
	const 
        genre = props.genre,
        productionYear = props.productionYear;
    let filteredMovies = props.movies;

    const matches= (text: string, partial: string) => {
        return text && partial ? text.toLowerCase().indexOf(partial.toLowerCase()) > -1 : false;
      }

    if (props.genre) {
        filteredMovies = filteredMovies.filter((movie: any, index: number) => {
            return matches(movie.genre, genre);
        })
    }

    if (props.productionYear) {
        filteredMovies = filteredMovies.filter((movie: any, index: number) => {
            return movie && movie.productionYear ? 
                matches(movie.productionYear.toString(), productionYear.toString())
                : false;
        })

    }

	return (
		<>
        {filteredMovies.map((movie: any, index: number) => (
            <Movie props={movie} key={index} mainPageClickHandler={props.mainPageClickHandler}/>
        ))}
		</>
	);
};

export default MoviesBoard;