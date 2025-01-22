import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_MOVIES, fetchMoviesSuccess, fetchMoviesFailure, FETCH_OMDB_MOVIE, fetchOmdbMovieSuccess, fetchOmdbMovieFailure, SET_FILTER_TEXT, SET_SORT_OPTION } from '../actions/movieAction';
import { stat } from 'fs';

const SWAPI_URL = 'https://swapi.dev/api/films/';
const OMDB_API_URL = 'https://www.omdbapi.com/?apikey=b9a5e69d&t=';
let originalMovie: any[]=[]
export function* fetchMoviesSaga(action: any) {
  try {
    const response: {data: any} = yield call(axios.get, SWAPI_URL);
    originalMovie=response.data.results;
    yield put(fetchMoviesSuccess(response.data.results));
  } catch (error: any) {
    yield put(fetchMoviesFailure(error.message));
  }
}
export function* setMovie(action: any){
  try{
  const filteredMovies = originalMovie.filter((movie: any) =>
      movie.title.toLowerCase().includes(action.payload?.filterText)
    );
    yield put(fetchMoviesSuccess(filteredMovies));
  } catch (error: any) {
    yield put(fetchMoviesFailure(error.message));
}
}
export function* setSortMovie(action: any){
  try{
    const filteredMovies = action.payload.movies
    filteredMovies && [...filteredMovies]?.sort((a: any, b: any) => {
      if (action.payload.sortOption === 'episode_id') {
        return a.episode_id - b.episode_id;
      } else if (action.payload.sortOption === 'release_date') {
        return new Date(a.release_date).getFullYear() - new Date(b.release_date).getFullYear();
      }
      return 0;
    });
    yield put(fetchMoviesSuccess(filteredMovies));
  } catch (error: any) {
    yield put(fetchMoviesFailure(error.message));
}
}
export function* fetchOmdbMovieSaga(action: any) {
  try {
    const response: { data: any} = yield call(axios.get, `${OMDB_API_URL}${action.payload}`);
    yield put(fetchOmdbMovieSuccess(response.data, action.payload));
  } catch (error: any) {
    yield put(fetchOmdbMovieFailure(error.message));
  }
}

export default function* movieSaga() {
  yield takeEvery(FETCH_MOVIES, fetchMoviesSaga);
  yield takeEvery(FETCH_OMDB_MOVIE, fetchOmdbMovieSaga);
  yield takeEvery(SET_FILTER_TEXT, setMovie);
  yield takeEvery(SET_SORT_OPTION, setSortMovie)
}
