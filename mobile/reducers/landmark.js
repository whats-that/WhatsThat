import axios from 'axios';

const GET_LANDMARK = 'GET_LANDMARK';
const GET_LANDMARKS = 'GET_LANDMARKS';
const ADD_LANDMARK = 'ADD_LANDMARK';
const GET_USER_LANDMARKS = 'GET_USER_LANDMARKS';

const addLandmark = landmark => ({
  type: ADD_LANDMARK,
  landmark,
});

const getLandmarks = landmarks => ({
  type: GET_LANDMARKS,
  landmarks,
});

const getUserLandmark = landmarks => ({
  type: GET_USER_LANDMARKS,
  landmarks,
});

export const fetchLandmarks = () => async dispatch => {
  try {
    const res = await axios.get('http://whatsthat-capstone.herokuapp.com/api/landmark');
    const landmarks = res.data;
    dispatch(getLandmarks(landmarks));
  } catch (err) {
    console.error('error in thunk creator: ', err);
  }
};

export const fetchUserLandmark = userId => async dispatch => {
  try {
    const res = await axios.get(
      `http://whatsthat-capstone.herokuapp.com/api/landmark/${userId}`
    );
    const landmarks = res.data;
    dispatch(getUserLandmark(landmarks));
  } catch (err) {
    console.error('error in thunk creator: ', err);
  }
};

export const createLandmark = landmark => async dispatch => {
  try {
    const res = await axios.post(
      `http://whatsthat-capstone.herokuapp.com/api/landmark`,
      landmark
    );
    const newlandmark = res.data;
    dispatch(addLandmark(newlandmark));
  } catch (err) {
    console.error('error in thunk creator: ', err);
  }
};

export default function(state = [], action) {
  switch (action.type) {
    case GET_LANDMARKS:
      return action.landmarks;
    case GET_USER_LANDMARKS:
      return action.landmarks;
    case ADD_LANDMARK:
      return [...state, action.landmark];
    default:
      return state;
  }
}
