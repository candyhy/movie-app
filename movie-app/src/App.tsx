import HomePage from './Components/HomePage';
import MoviePage from './Components/MoviePage';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie" element={<MoviePage />} />
    </Routes>
  );
};

export default App;
