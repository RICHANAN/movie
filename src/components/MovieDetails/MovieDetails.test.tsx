import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import createSagaMiddleware from 'redux-saga';
import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import MovieDetail from './index';
import rootSaga from '../../store/sagas/movieSaga';
import { fetchOmdbMovie } from '../../store/actions/movieAction';
import { Provider } from 'react-redux';

jest.mock('../../store/actions/movieAction', () => ({
  fetchOmdbMovie: jest.fn(),
}));

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);

describe('MovieDetail Component with Redux-Saga', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
        movies: [],
        selectedMovie: null,
        loading: false,
        error: null,
        movieDetails: {},
        sortOption: 'episode_id',
        filterText: '',
    });

    store.dispatch = jest.fn(); // Mock dispatch
  });

  it('displays a fallback message when no movie is selected', () => {
    render(
      <Provider store={store} >
        <MovieDetail />
      </Provider>
    );

    expect(screen.getByText('Select a movie to see details.')).toBeInTheDocument();
  });

  it('fetches OMDB data when a movie is selected and renders the details', async () => {
    const dispatched: any[] = [];
    const fakeStore = {
      getState: () => store.getState(),
      dispatch: (action: any) => dispatched.push(action),
    };

    store = mockStore({
      selectedMovie: {
        title: 'Star Wars',
        opening_crawl: 'A long time ago in a galaxy far, far away...',
        director: 'George Lucas',
        producer: 'Gary Kurtz',
        release_date: '1977-05-25',
      },
      movieDetails: {
        'Star Wars': {
          Poster: 'https://example.com/star-wars-poster.jpg',
          imdbRating: '8.6',
        },
      },
    });

    render(
      <Provider store={store}>
        <MovieDetail />
      </Provider>
    );

    // Verify movie details are displayed
    expect(screen.getByText('Star Wars')).toBeInTheDocument();
    expect(screen.getByText('Director: George Lucas')).toBeInTheDocument();
    expect(screen.getByText('Producer: Gary Kurtz')).toBeInTheDocument();
    expect(screen.getByText('Release Date: 1977-05-25')).toBeInTheDocument();
    expect(screen.getByText('A long time ago in a galaxy far, far away...')).toBeInTheDocument();

    // Verify OMDB data is displayed
    expect(screen.getByText('Rating: 8.6')).toBeInTheDocument();
    const poster = screen.getByAltText('Star Wars');
    expect(poster).toHaveAttribute('src', 'https://example.com/star-wars-poster.jpg');

    // Verify fetchOmdbMovie is called
    expect(fetchOmdbMovie).toHaveBeenCalledWith('Star Wars');

    // Run saga and verify that actions are dispatched
    await runSaga(fakeStore, rootSaga);

    // Verify that the dispatch includes fetching OMDB data
    expect(dispatched).toContainEqual(fetchOmdbMovie('Star Wars'));
  });

  it('renders without OMDB data when not available', () => {
    store = mockStore({
      selectedMovie: {
        title: 'Star Wars',
        opening_crawl: 'A long time ago in a galaxy far, far away...',
        director: 'George Lucas',
        producer: 'Gary Kurtz',
        release_date: '1977-05-25',
      },
      movieDetails: {}, // No OMDB data for the selected movie
    });

    render(
      <Provider store={store}>
        <MovieDetail />
      </Provider>
    );

    // Verify movie details are displayed
    expect(screen.getByText('Star Wars')).toBeInTheDocument();
    expect(screen.queryByText('Rating:')).not.toBeInTheDocument(); // No rating displayed
  });
});
