import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_MOVIES, fetchMoviesSuccess, fetchMoviesFailure, FETCH_OMDB_MOVIE, fetchOmdbMovieSuccess, fetchOmdbMovieFailure, SET_FILTER_TEXT } from '../actions/movieAction';
import { stat } from 'fs';

const SWAPI_URL = 'https://swapi.dev/api/films/';
const OMDB_API_URL = 'https://www.omdbapi.com/?apikey=b9a5e69d&t=';

function* fetchMoviesSaga(action: any) {
  try {
    const response: {data: any} = yield call(axios.get, SWAPI_URL);
    
    yield put(fetchMoviesSuccess(response.data.results));
  } catch (error: any) {
    yield put(fetchMoviesFailure(error.message));
  }
}
function* setMovie(action: any){
  try{
  const filteredMovies = action.movies.filter((movie: any) =>
      movie.title.toLowerCase().includes(action.payload.toLowerCase())
    );
    yield put(fetchMoviesSuccess(filteredMovies));
  } catch (error: any) {
    yield put(fetchMoviesFailure(error.message));
}
}
function* fetchOmdbMovieSaga(action: any) {
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
  yield takeEvery(SET_FILTER_TEXT, setMovie)
}
