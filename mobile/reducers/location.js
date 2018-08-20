import axios from 'axios';

const GET_PLACES = 'GET_PLACES';

// require url build
export const fetchPlaces = region => async dispatch => {
  try {
    const res = await axios.get(url);
    const places = res.data;
    dispatch({ type: GET_PLACES, places });
  } catch (err) {
    console.error('error in thunk creator: ', err);
  }
};
