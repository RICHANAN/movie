import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import configureStore from 'redux-mock-store';
import { runSaga } from 'redux-saga';
import { Home } from './index';
import rootSaga from '../../store/sagas/movieSaga';
import { fetchMovies } from '../../store/actions/movieAction';

jest.mock('../../store/actions/movieAction', () => ({
  fetchMovies: jest.fn(),
  setFilterText: jest.fn(),
  setSortOption: jest.fn(),
}));

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);

describe('Home Component with Redux-Saga', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      movies: [
        { title: 'Movie 1', episode_id: 1, release_date: '2000-01-01' },
        { title: 'Movie 2', episode_id: 2, release_date: '2005-01-01' },
      ],
      sortOption: 'episode_id',
      filterText: '',
    });
  });

  it('renders controls and movie components', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Filter by title')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('runs fetchMovies saga on mount', async () => {
    const dispatched: any[] = [];
    const fakeStore = {
      getState: () => store.getState(),
      dispatch: (action: any) => dispatched.push(action),
    };

    await runSaga(fakeStore, rootSaga);

    expect(fetchMovies).toHaveBeenCalled();
    expect(dispatched).toContainEqual(fetchMovies());
  });

  it('handles filter text change', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const filterInput = screen.getByPlaceholderText('Filter by title');
    fireEvent.change(filterInput, { target: { value: 'Star' } });

    expect(fetchMovies).not.toHaveBeenCalled(); // No fetch on filter
    expect(store.getActions()).toContainEqual({
      type: 'SET_FILTER_TEXT',
      payload: { filterText: 'Star', movies: store.getState().movies },
    });
  });

  it('handles sort option change', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const sortDropdown = screen.getByRole('combobox');
    fireEvent.change(sortDropdown, { target: { value: 'release_date' } });

    expect(store.getActions()).toContainEqual({
      type: 'SET_SORT_OPTION',
      payload: { sortOption: 'release_date', movies: store.getState().movies },
    });
  });
});
