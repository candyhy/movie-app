import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/MoviesBoard.css';

export type Movie = {
  name: string;
  productionYear: number;
  genre: string;
  synopsisShort: string;
  synopsis: string;
  Poster: string;
};

const MovieBoard = (
  { props }: any,
  mainPageClickHandler: React.MouseEvent<HTMLDivElement>
) => {
  const navigate = useNavigate();
  const id = encodeURIComponent(props.name);

  const toMoviePage = () => {
    navigate(`/movie/${id}`, { state: { props, mainPageClickHandler, id } });
  };

  return (
    <div className="image" onClick={toMoviePage}>
      <Link to={`/movie/${id}`}></Link>
      <img src={props.Poster} alt="movie" />
    </div>
  );
};

const MoviesBoard = (props: any) => {
  const genre = props.genre,
    productionYear = props.productionYear;
  let filteredMovies = props.movies;

  const matches = (text: string, partial: string) => {
    return text && partial
      ? text.toLowerCase().indexOf(partial.toLowerCase()) > -1
      : false;
  };

  if (props.genre) {
    filteredMovies = filteredMovies.filter((movie: Movie) => {
      return matches(movie.genre, genre);
    });
  }

  if (props.productionYear) {
    filteredMovies = filteredMovies.filter((movie: Movie) => {
      return movie && movie.productionYear
        ? matches(movie.productionYear.toString(), productionYear.toString())
        : false;
    });
  }

  const moviesPerRow = 4;

  const renderMovieBoards = () => {
    const movieLayout = [];
    for (let i = 0; i < filteredMovies.length; i += moviesPerRow) {
      movieLayout.push(filteredMovies.slice(i, i + moviesPerRow));
    }

    return movieLayout.flatMap((movieArr: Movie[], rowIndex: number) => (
      <div className="row my-4" key={rowIndex}>
        {movieArr.map((movie: Movie, colIndex: number) => (
          <div className="movies-spacing" key={colIndex}>
            <MovieBoard
              props={movie}
              mainPageClickHandler={props.mainPageClickHandler}
            />
          </div>
        ))}
      </div>
    ));
  };

  return <>{renderMovieBoards()}</>;
};

export default MoviesBoard;
