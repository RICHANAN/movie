import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchMoviesSaga,
  fetchOmdbMovieSaga,
  setMovie,
  setSortMovie
}
 from './movieSaga'; // Adjust the import path based on your folder structure
import {
  fetchMoviesSuccess,
  fetchMoviesFailure,
  fetchOmdbMovieSuccess,
  fetchOmdbMovieFailure,
} from '../actions/movieAction';

const SWAPI_URL = 'https://swapi.dev/api/films/';
const OMDB_API_URL = 'https://www.omdbapi.com/?apikey=b9a5e69d&t=';

describe('movieSaga', () => {
    it('dispatches fetchMoviesSuccess on successful API call', () => {
      const action = { type: 'FETCH_MOVIES' };
      const saga = fetchMoviesSaga(action);
      const mockResponse = { data: { results: [{ title: 'A New Hope' }] } };

      expect(saga.next().value).toEqual(call(axios.get, SWAPI_URL));
      expect(saga.next(mockResponse).value).toEqual(put(fetchMoviesSuccess(mockResponse.data.results)));
      expect(saga.next().done).toBe(true);
    });

    it('dispatches fetchMoviesFailure on API failure', () => {
      const action = { type: 'FETCH_MOVIES' };
      const saga = fetchMoviesSaga(action);
      const mockError = new Error('Network Error');

      expect(saga.next().value).toEqual(call(axios.get, SWAPI_URL));
      expect(saga.throw(mockError).value).toEqual(put(fetchMoviesFailure(mockError.message)));
      expect(saga.next().done).toBe(true);
    });
  });

  describe('setMovie', () => {
    it('dispatches fetchMoviesSuccess with filtered movies', () => {
      const action = {
        type: 'SET_FILTER_TEXT',
        payload: { filterText: 'hope' },
      };
      const saga = setMovie(action);
      const mockMovies = [
        { title: 'A New Hope' },
        { title: 'The Empire Strikes Back' },
      ];

      const filteredMovies = [{ title: 'A New Hope' }];
      expect(saga.next().value).toEqual(
        put(fetchMoviesSuccess(filteredMovies))
      );
      expect(saga.next().done).toBe(true);
    });
  });

  describe('setSortMovie', () => {
    it('dispatches fetchMoviesSuccess with sorted movies by episode_id', () => {
      const action = {
        type: 'SET_SORT_OPTION',
        payload: {
          movies: [
            { episode_id: 5, title: 'The Empire Strikes Back' },
            { episode_id: 4, title: 'A New Hope' },
          ],
          sortOption: 'episode_id',
        },
      };
      const saga = setSortMovie(action);
      const sortedMovies = [
        { episode_id: 4, title: 'A New Hope' },
        { episode_id: 5, title: 'The Empire Strikes Back' },
      ];

      expect(saga.next().value).toEqual(put(fetchMoviesSuccess(sortedMovies)));
      expect(saga.next().done).toBe(true);
    });
  });

  describe('fetchOmdbMovieSaga', () => {
    it('dispatches fetchOmdbMovieSuccess on successful API call', () => {
      const action = { type: 'FETCH_OMDB_MOVIE', payload: 'Star Wars' };
      const saga = fetchOmdbMovieSaga(action);
      const mockResponse = { data: { Title: 'Star Wars' } };

      expect(saga.next().value).toEqual(call(axios.get, `${OMDB_API_URL}Star Wars`));
      expect(saga.next(mockResponse).value).toEqual(
        put(fetchOmdbMovieSuccess(mockResponse.data, 'Star Wars'))
      );
      expect(saga.next().done).toBe(true);
    });

    it('dispatches fetchOmdbMovieFailure on API failure', () => {
      const action = { type: 'FETCH_OMDB_MOVIE', payload: 'Star Wars' };
      const saga = fetchOmdbMovieSaga(action);
      const mockError = new Error('Network Error');

      expect(saga.next().value).toEqual(call(axios.get, `${OMDB_API_URL}Star Wars`));
      expect(saga.throw(mockError).value).toEqual(
        put(fetchOmdbMovieFailure(mockError.message))
      );
      expect(saga.next().done).toBe(true);
    });
  });
});
