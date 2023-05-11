import React, { useState, useEffect } from 'react';
import HomePage from './Components/HomePage';
import MoviePage from './Components/MoviePage';
import { Routes, Route } from 'react-router-dom';


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
      synopsis: movie.synopsis,
      synopsisShort: movie.synopsisShort,
      Poster: resJson.Poster,
    }
  };  

const App = () => {
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

    return (
        <Routes>
            <Route path='/' element={<HomePage movies={movies} mainPageClickHandler={mainPageClickHandler} setMovies={setMovies}/>} />
            <Route path='/movie' element={<MoviePage/>} />
        </Routes>
    );
}
  
export default App;
