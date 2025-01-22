import movieReducer from './movieReducer';
import {
  FETCH_MOVIES_SUCCESS,
  SELECT_MOVIE,
  FETCH_OMDB_MOVIE_SUCCESS,
  SET_SORT_OPTION,
  SET_FILTER_TEXT,
} from '../actions/movieAction';

describe('movieReducer', () => {
  const initialState = {
    movies: [],
    selectedMovie: null,
    loading: false,
    error: null,
    movieDetails: {},
    sortOption: 'episode_id',
    filterText: '',
  };

  it('should return the initial state when no action is provided', () => {
    expect(movieReducer(undefined, {} as any)).toEqual(initialState);
  });

  it('should handle FETCH_MOVIES_SUCCESS', () => {
    const movies = [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }];
    const action = { type: FETCH_MOVIES_SUCCESS, payload: movies };

    const expectedState = {
      ...initialState,
      movies,
      loading: false,
    };

    expect(movieReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SELECT_MOVIE', () => {
    const selectedMovie = { id: 1, title: 'Movie 1' };
    const action = { type: SELECT_MOVIE, payload: selectedMovie };

    const expectedState = {
      ...initialState,
      selectedMovie,
    };

    expect(movieReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_OMDB_MOVIE_SUCCESS', () => {
    const action = {
      type: FETCH_OMDB_MOVIE_SUCCESS,
      payload: {
        movieTitle: 'Movie 1',
        movieData: { rating: 8.5 },
      },
    };

    const expectedState = {
      ...initialState,
      movieDetails: {
        'Movie 1': { rating: 8.5 },
      },
    };

    expect(movieReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_SORT_OPTION', () => {
    const action = {
      type: SET_SORT_OPTION,
      payload: {
        movies: [{ title: 'B Movie' }, { title: 'A Movie' }],
        sortOption: 'title',
      },
    };

    const expectedState = {
      ...initialState,
      movies: [{ title: 'B Movie' }, { title: 'A Movie' }],
      sortOption: 'title',
    };

    expect(movieReducer(initialState, action)).toEqual(expectedState);
  });

 
});
