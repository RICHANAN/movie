import React, { useEffect, useState } from 'react';
import  MovieList from '../../components/MovieList';
import  MovieDetails  from '../../components/MovieDetails';
import { useDispatch, useSelector } from 'react-redux';
import MovieSearch from '../../components/MovieSearch';
import { fetchMovies, setFilterText, setSortOption } from '../../store/actions/movieAction';

export const Home: React.FC = () => {
    const { movies, sortOption, filterText } = useSelector((state: any) => state.movies);

    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState<string>('');
  
    useEffect(() => {
      dispatch(fetchMovies());
    }, [dispatch]);
  
    const handleSearch = (query: string) => {
      setSearchQuery(query);
    };
   
    
      const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSortOption(event.target.value));
      };
    
      const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilterText(event.target.value));
      };
    
      // Filter the movies by title
      const filteredMovies = movies?.filter((movie: any) => 
        movie.title.toLowerCase().includes(filterText?.toLowerCase())
      );
    
      // Sort the filtered movies
    //   const sortedMovies = [...filteredMovies]?.sort((a: any, b: any) => {
    //     if (sortOption === 'episode_id') {
    //       return a.episode_id - b.episode_id;
    //     } else if (sortOption === 'release_date') {
    //       return new Date(a.release_date).getFullYear() - new Date(b.release_date).getFullYear();
    //     }
    //     return 0;
    //   });
  return (
    <>
    {/* <MovieSearch onSearch={handleSearch} /> */}
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