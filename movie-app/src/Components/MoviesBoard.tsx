import React from 'react';
import { useNavigate } from 'react-router-dom';

export type Movie = {
  name: string;
  productionYear: number;
  genre: string;
  synopsisShort: string;
  synopsis: string;
  image: string;
};

const MovieBoard = (
  { props }: any,
  key: number,
  mainPageClickHandler: React.MouseEvent<HTMLDivElement>
) => {
  const navigate = useNavigate();

  const toMoviePage = () => {
    navigate('/movie', { state: { props, mainPageClickHandler } });
  };

  return (
    <div className="image" onClick={toMoviePage} key={key}>
      <img src={props.Poster} alt="movie"></img>
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

  return (
    <>
      {filteredMovies.map((movie: Movie, index: number) => (
        <MovieBoard
          props={movie}
          key={index}
          mainPageClickHandler={props.mainPageClickHandler}
        />
      ))}
    </>
  );
};

export default MoviesBoard;
