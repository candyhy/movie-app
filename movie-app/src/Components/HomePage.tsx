import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/HomePage.css';
import MoviesBoard from './MoviesBoard';
import MainPageHeading from './MainPageHeading';
import FilterBox from './FilterBox';

const HomePage = (props: any) => {
	const [year, setYearInput] = useState('');
  const [genre, setGenreInput] = useState("");

  return (
    <div className='container-fluid movie-app'>
      <div className='btn d-flex align-items-center mt-5 mb-5' onClick={props.mainPageClickHandler}>
				<MainPageHeading heading='Movies' />
			</div>
      <div className='row mt-5 mb-5'>
        <FilterBox filterValue={genre} setFilterValue={setGenreInput} placeHolder={'Type to search genre...'}></FilterBox>
        <FilterBox filterValue={year} setFilterValue={setYearInput} placeHolder={'Type to search year...'}></FilterBox>
      </div>
      <div className='row'>
        <MoviesBoard movies={props.movies} genre={genre} productionYear={year} mainPageClickHandler={props.mainPageClickHandler} setMovies={props.setMovies}/>
      </div>
    </div>
  );
};

export default HomePage;
