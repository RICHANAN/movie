export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';
export const SELECT_MOVIE = 'SELECT_MOVIE';
export const FETCH_OMDB_MOVIE = 'FETCH_OMDB_MOVIE';
export const FETCH_OMDB_MOVIE_SUCCESS = 'FETCH_OMDB_MOVIE_SUCCESS';
export const FETCH_OMDB_MOVIE_FAILURE = 'FETCH_OMDB_MOVIE_FAILURE';
export const SET_SORT_OPTION = 'SET_SORT_OPTION';
export const SET_FILTER_TEXT = 'SET_FILTER_TEXT';

export const setSortOption = (sortOption: string) => ({
  type: SET_SORT_OPTION,
  payload: sortOption
});

export const setFilterText = (filterText: string) => ({
  type: SET_FILTER_TEXT,
  payload: filterText
});

export const fetchOmdbMovie = (movieTitle: string) => ({
    type: FETCH_OMDB_MOVIE,
    payload: movieTitle
  });
  
  export const fetchOmdbMovieSuccess = (movieData: any, movieTitle: string) => ({
    type: FETCH_OMDB_MOVIE_SUCCESS,
    payload: { movieData, movieTitle }
  });
  
  export const fetchOmdbMovieFailure = (error: string) => ({
    type: FETCH_OMDB_MOVIE_FAILURE,
    payload: error
  });

export const fetchMovies = (filterText?:string) => ({
  type: FETCH_MOVIES
});

export const fetchMoviesSuccess = (movies: any[]) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies
});

export const fetchMoviesFailure = (error: string) => ({
  type: FETCH_MOVIES_FAILURE,
  payload: error
});

export const selectMovie = (movie: any) => ({
  type: SELECT_MOVIE,
  payload: movie
});
