import movieReducer from '../reducers/movieReducer';
import { fetchMoviesSuccess, fetchMoviesFailure } from '../actions/movieAction';

describe('movieReducer', () => {
  const initialState = {
    movies: [],
    selectedMovie:'',
    filterText: '',
    loading: false,
    error: null,
    movieDetails: {}, // Store OMDB data per movie
  sortOption: '',
  };

  it('should return the initial state', () => {
    expect(movieReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_MOVIES_SUCCESS', () => {
    const movies = [{ title: 'A New Hope', episode_id: 4 }];
    const action = fetchMoviesSuccess(movies);

    const expectedState = {
      ...initialState,
      movies,
      loading: false,
    };

    expect(movieReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_MOVIES_FAILURE', () => {
    const action = fetchMoviesFailure('Network Error');

    const expectedState = {
      ...initialState,
      error: 'Network Error',
    };

    expect(movieReducer(initialState, action)).toEqual(expectedState);
  });
});
