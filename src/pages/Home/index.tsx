import React, { useEffect, useState } from 'react';
import  MovieList from '../../components/MovieList';
import  MovieDetails  from '../../components/MovieDetails';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setFilterText, setSortOption } from '../../store/actions/movieAction';
import { Provider } from 'react-redux';

export const Home: React.FC = () => {
    const { movies, sortOption, filterText } = useSelector((state: any) => state);
    const newMovie=movies;
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState<string>('');
  
    useEffect(() => {
      dispatch(fetchMovies());
    }, [dispatch]);
  
    const handleSearch = (query: string) => {
      setSearchQuery(query);
    };
   
    
      const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSortOption(event.target.value, movies));
      };
    
      const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilterText(event.target.value, newMovie));
      };
    
     
  return (
    <>
    <div className="controls">
        <input 
          type="text"
          placeholder="Filter by title"
          value={filterText}
          onChange={handleFilterChange}
        />
        <select onChange={handleSortChange} value={sortOption}>
          <option value="episode_id">Sort by Episode</option>
          <option value="release_date">Sort by Year</option>
        </select>
      </div>
      <div className="movie-container">
        <MovieList />
        <MovieDetails />
      </div>
      </>
  );
};