import React from 'react';
import { useDispatch } from 'react-redux';

interface MovieSearchProps {
  onSearch: (query: string) => void;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search for a movie"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default MovieSearch;
