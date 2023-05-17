import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/HomePage.css';
import MoviesBoard from './MoviesBoard';
import MainPageHeading from './MainPageHeading';
import FilterBox from './FilterBox';
import { Movie } from './MoviesBoard';
import ErrorView from './ErrorView';
import LoadingSpinner from './LoadingSpinner';

type Image = { image: string };
type MovieWithImage = Partial<Omit<Movie, 'Poster'>> & Image;

const createMovie = async (movie: MovieWithImage) => {
  const title = movie?.name || '';
  const url = `https://www.omdbapi.com/?t=${title}&apikey=263d22d8`;
  const res = await fetch(url);
  const resJson = await res.json();

  return {
    name: movie?.name,
    genre: movie?.genre,
    productionYear: movie?.productionYear,
    synopsis: movie?.synopsis,
    synopsisShort: movie?.synopsisShort,
    Poster: resJson?.Poster,
  };
};

const HomePage = () => {
  const [year, setYearInput] = useState('');
  const [genre, setGenreInput] = useState('');
  const [movies, setMovies] = useState([] as any[]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const getAllMovies = async () => {
    const url = `https://remarkable-bombolone-51a3d9.netlify.app/.netlify/functions/movies`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch movies.');
      }

      const responseJson = await response.json();
      const model = [];

      for (const element in responseJson) {
        const newElement = await createMovie(responseJson[element]);
        model.push(newElement);
      }

      setMovies(model);
      setHasError(false);
    } catch (error) {
      console.error(error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const mainPageClickHandler = () => {
    setHasError(false);
    setIsLoading(true);
    getAllMovies();
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  if (hasError) {
    return <ErrorView onReload={mainPageClickHandler} />;
  }

  return (
    <div className="container-fluid movie-app">
      <div className="btn d-flex align-items-center mt-5 mb-5" onClick={mainPageClickHandler}>
        <MainPageHeading heading="Movies" />
      </div>
      <div className="row mt-5 mb-5">
        <FilterBox
          filterValue={genre}
          setFilterValue={setGenreInput}
          placeHolder="Type to search genre..."
        />
        <FilterBox
          filterValue={year}
          setFilterValue={setYearInput}
          placeHolder="Type to search year..."
        />
      </div>
      {isLoading ? (
        <div className="text-center">
          <h4>Loading...</h4>
          <LoadingSpinner/>
        </div>
      ) : 
        //       <div className="row">
        //   <MoviesBoard
        //     movies={movies}
        //     genre={genre}
        //     productionYear={year}
        //     mainPageClickHandler={mainPageClickHandler}
        //   />
        // </div>
      (
        <MoviesBoard
          movies={movies}
          genre={genre}
          productionYear={year}
          mainPageClickHandler={mainPageClickHandler}
          />

      )
      }
    </div>
  );
};

export default HomePage;
