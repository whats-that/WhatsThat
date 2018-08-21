const SET_SEARCHSTRING = 'SET_SEARCHSTRING';

const set_searchString = searchString => {
  return {
    type: SET_SEARCHSTRING,
    searchString: searchString,
  };
};

export const setSearchString = searchString => dispatch => {
  dispatch(set_searchString(searchString));
};

export default function(searchString = '', action) {
  switch (action.type) {
    case SET_SEARCHSTRING:
      return action.searchString;
    default:
      return searchString;
  }
}
