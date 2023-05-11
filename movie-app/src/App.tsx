import React, { ChangeEvent, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MainPage from './Components/MainPage';
import MainPageHeading from './Components/MainPageHeading';


const createMovie = async (movie: any) => {
  const 
    title = movie.name,
    url = `http://www.omdbapi.com/?t=${title}&apikey=263d22d8`,
    res = await fetch(url),
    resJson = await res.json();

  return {
    name: movie.name,
    genre: movie.genre,
    productionYear: movie.productionYear,
    sypnosis: movie.sypnosis,
    shortSypnosis: movie.shortSypnosis,
    Poster: resJson.Poster,
  }
}

function App() {
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

  const mainPageClickHandler = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    getAllMovies();
  };

  useEffect(() => {
    getAllMovies();
	}, []);

  return (
    <div className='container-fluid movie-app'>
      <div className='btn d-flex align-items-center mt-5 mb-5' onClick={mainPageClickHandler}>
				<MainPageHeading heading='Movies' />
			</div>
      <div className='row'>
        <MainPage movies={movies}/>
      </div>
    </div>
  );
}

export default App;
