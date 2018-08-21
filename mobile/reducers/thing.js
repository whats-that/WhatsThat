import axios from 'axios';

const GET_THING = 'GET_THING';
const GET_THINGS = 'GET_THINGS';
const ADD_THING = 'ADD_THING';
const GET_USER_THINGS = 'GET_USER_THINGS';

const getThing = thing => ({
  type: GET_THING,
  thing,
});

const addThing = thing => ({
  type: ADD_THING,
  thing,
});

const getThings = things => ({
  type: GET_THINGS,
  things,
});

const getUserThing = things => ({
  type: GET_USER_THINGS,
  things,
});

export const fetchThings = () => async dispatch => {
  try {
    const res = await axios.get('http://172.16.21.174:8080/api/thing');
    const things = res.data;
    dispatch(getThings(things));
  } catch (err) {
    console.error('error in thunk creator: ', err);
  }
};

export const fetchUserThing = userId => async dispatch => {
  try {
    console.log('fetch user things thunk start.. ');
    const res = await axios.get(
      `http://172.16.21.174:8080/api/thing/${userId}`
    );
    const things = res.data;
    console.log('in thunk, my things... ', things);
    dispatch(getUserThing(things));
  } catch (err) {
    console.error('error in thunk creator: ', err);
  }
};

export const createThing = thing => async dispatch => {
  try {
    const res = await axios.post(`http://172.16.21.174:8080/api/thing`, thing);
    const newthing = res.data;
    dispatch(addThing(newthing));
  } catch (err) {
    console.error('error in thunk creator: ', err);
  }
};

export default function(state = [], action) {
  switch (action.type) {
    case GET_THINGS:
      return action.things;
    case GET_USER_THINGS:
      return action.things;
    case ADD_THING:
      return [...state, action.thing];
    default:
      return state;
  }
}
