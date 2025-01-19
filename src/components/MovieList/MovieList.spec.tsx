import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import {configureStore} from 'redux-mock-store';
import MovieList from '../../components/MovieList';
import { fetchMovies } from '../../store/actions/movieAction';

jest.mock('../actions/movieActions', () => ({
  fetchMovies: jest.fn(),
}));

const mockStore = configureStore([]);

describe('MovieList', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      movies: [
        { title: 'A New Hope', episode_id: 4 },
        { title: 'The Empire Strikes Back', episode_id: 5 },
      ],
      filterText: '',
    });

    store.dispatch = jest.fn();
  });

  it('should render the movie list', () => {
    render(
      <Provider store={store}>
        <MovieList />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Filter by title')).toBeInTheDocument();
    expect(screen.getByText('A New Hope')).toBeInTheDocument();
    expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument();
  });

  it('should dispatch fetchMovies on filter change', () => {
    render(
      <Provider store={store}>
        <MovieList />
      </Provider>
    );

    const filterInput = screen.getByPlaceholderText('Filter by title');
    fireEvent.change(filterInput, { target: { value: 'hope' } });

    expect(store.dispatch).toHaveBeenCalledWith(fetchMovies('hope'));
  });

  it('should filter the movies displayed', () => {
    store = mockStore({
      movies: [
        { title: 'A New Hope', episode_id: 4 },
        { title: 'The Empire Strikes Back', episode_id: 5 },
      ],
      filterText: 'hope',
    });

    render(
      <Provider store={store}>
        <MovieList />
      </Provider>
    );

    expect(screen.getByText('A New Hope')).toBeInTheDocument();
    expect(screen.queryByText('The Empire Strikes Back')).toBeNull();
  });
});
