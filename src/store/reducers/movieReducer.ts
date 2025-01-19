import { FETCH_MOVIES_SUCCESS, SELECT_MOVIE, FETCH_OMDB_MOVIE_SUCCESS, SET_SORT_OPTION, SET_FILTER_TEXT } from '../actions/movieAction';

interface MovieState {
  movies: any[];
  selectedMovie: any;
  loading: boolean;
  error: string | null;
  movieDetails: { [key: string]: any }; // Store OMDB data per movie
  sortOption: string;
  filterText: string;
}

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  error: null,
  movieDetails: {},
  sortOption: 'episode_id', // Default sorting by episode
  filterText: '',
};

const movieReducer = (state = initialState, action: any): MovieState => {
  switch (action.type) {
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload,
        loading: false
      };
    case SELECT_MOVIE:
      return {
        ...state,
        selectedMovie: action.payload
      };
    case FETCH_OMDB_MOVIE_SUCCESS:
      return {
        ...state,
        movieDetails: {
          ...state.movieDetails,
          [action.payload.movieTitle]: action.payload.movieData
        }
      };
    case SET_SORT_OPTION:
      return {
        ...state,
        movies: action.payload,
        sortOption: action.payload
      };
    case SET_FILTER_TEXT:
      return {
        ...state,
        movies: action.payload,
        filterText: action.payload
      };
    default:
      return state;
  }
};

export default movieReducer;
