import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOmdbMovie } from '../../store/actions/movieAction';

const MovieDetail: React.FC = () => {
  const dispatch = useDispatch();
  const selectedMovie = useSelector((state: any) => state.selectedMovie);
  const movieDetails = useSelector((state: any) => state.movieDetails);
  
  useEffect(() => {
    if (selectedMovie) {
      dispatch(fetchOmdbMovie(selectedMovie.title)); // Fetch OMDB data when movie is selected
    }
  }, [dispatch, selectedMovie]);

  if (!selectedMovie) {
    return <div>Select a movie to see details.</div>;
  }

  const omdbData = movieDetails[selectedMovie.title];

  return (
    <div className="movie-detail">
      <h2>{selectedMovie.title}</h2>
    <div className='movieDetailDesc'>  {omdbData && <img src={omdbData.Poster} alt={selectedMovie.title} style={{ width: '200px', height: 'auto' }} />
} 
<p>{selectedMovie.opening_crawl}</p>
</div>
      <p>Director: {selectedMovie.director}</p>
      <p>Producer: {selectedMovie.producer}</p>
      <p>Release Date: {selectedMovie.release_date}</p>
      
      {omdbData && (
        
          <h3>Rating: {omdbData.imdbRating}</h3>
      )}
    </div>
  );
};

export default MovieDetail;
