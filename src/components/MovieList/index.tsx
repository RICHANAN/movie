import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMovie } from '../../store/actions/movieAction';

const MovieList: React.FC = () => {
  const movies = useSelector((state: any) => state.movies);
  const dispatch = useDispatch();

  const handleSelectMovie = (movie: any) => {
    dispatch(selectMovie(movie));
  };

  return (
    <div className="movie-list">
      {movies.map((movie: any) => (
        <div key={movie.episode_id} onClick={() => handleSelectMovie(movie)}>
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
