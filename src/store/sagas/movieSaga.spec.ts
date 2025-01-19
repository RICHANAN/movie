import { runSaga } from 'redux-saga';
import axios from 'axios';
import fetchMoviesSaga  from '../sagas/movieSaga';
import { fetchMoviesSuccess, fetchMoviesFailure } from '../actions/movieAction';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchMoviesSaga', () => {
  it('should fetch and filter movies successfully', async () => {
    const dispatched: any[] = [];
    const filterText = 'hope';

    // Mock API response
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        results: [
          { title: 'A New Hope', episode_id: 4 },
          { title: 'The Empire Strikes Back', episode_id: 5 },
        ],
      },
    });

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchMoviesSaga
    ).toPromise();

    expect(dispatched).toEqual([
      fetchMoviesSuccess([{ title: 'A New Hope', episode_id: 4 }]),
    ]);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://swapi.dev/api/films/');
  });

  it('should handle errors', async () => {
    const dispatched: any[] = [];
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchMoviesSaga
    ).toPromise();

    expect(dispatched).toEqual([fetchMoviesFailure('Network Error')]);
  });
});
