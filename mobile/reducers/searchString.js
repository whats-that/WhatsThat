const GET_SEARCHSTRING = 'GET_SEARCHSTRING';

const getSearchString = searchString => ({
    type: GET_SEARCHSTRING,
    searchString,
  });

export const get_searchString = (searchString) => dispatch => {
    dispatch(getSearchString(searchString));
};

export default function(state = {}, action) {
    switch (action.type) {
      case GET_SEARCHSTRING:
        return { searchString: action.searchString };
      default:
        return state;
    }
  }
