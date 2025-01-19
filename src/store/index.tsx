import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import movieReducer from './reducers/movieReducer';
import movieSaga from './sagas/movieSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  movieReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(movieSaga);

export default store;
