import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/HomePage.css';
import MoviesBoard from './MoviesBoard';
import MainPageHeading from './MainPageHeading';
import FilterBox from './FilterBox';

const createMovie = async (movie: any) => {
  const 
    title = movie ? movie.name : "",
    url = `https://www.omdbapi.com/?t=${title}&apikey=263d22d8`,
    res = await fetch(url),
    resJson = await res.json();

  return {
    name: movie ? movie.name : undefined,
    genre: movie ? movie.genre : undefined,
    productionYear: movie ? movie.productionYear : undefined,
    synopsis: movie ? movie.synopsis : undefined,
    synopsisShort: movie ? movie.synopsisShort : undefined,
    Poster: resJson.Poster ? resJson.Poster : undefined,
  }
}; 

const HomePage = (props: any) => {
	const [year, setYearInput] = useState('');
  const [genre, setGenreInput] = useState("");
  const [movies, setMovies] = useState([] as any[]);

  const getAllMovies = async () => {
      const url = `https://remarkable-bombolone-51a3d9.netlify.app/.netlify/functions/movies`;
      let model = [];

      let 
          response = await fetch(url),
          responseJson = await response.json();

      for (const element in responseJson) {
          const newElement = await createMovie(responseJson[element]);
          model.push(newElement);
      }

      if (model) {
          setMovies(model);
      }
  };
    const mainPageClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        getAllMovies();
    };

    useEffect(() => {
        getAllMovies();
    }, []);

    if (!movies) {
        getAllMovies();
    }

  return (
    <div className='container-fluid movie-app'>
      <div className='btn d-flex align-items-center mt-5 mb-5' onClick={mainPageClickHandler}>
				<MainPageHeading heading='Movies' />
			</div>
      <div className='row mt-5 mb-5'>
        <FilterBox filterValue={genre} setFilterValue={setGenreInput} placeHolder={'Type to search genre...'}></FilterBox>
        <FilterBox filterValue={year} setFilterValue={setYearInput} placeHolder={'Type to search year...'}></FilterBox>
      </div> 
      <div className='row'>
        <MoviesBoard movies={movies} genre={genre} productionYear={year} mainPageClickHandler={mainPageClickHandler}/>
      </div>
    </div>
  );
};

export default HomePage;
