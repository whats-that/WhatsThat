import axios from 'axios';

const GET_LANDMARK = 'GET_LANDMARK';
const GET_LANDMARKS = 'GET_LANDMARKS';
const ADD_LANDMARK = 'ADD_LANDMARK';
const GET_USER_LANDMARKS = 'GET_USER_LANDMARKS';

const getLandmark = landmark => ({
  type: GET_LANDMARK,
  landmark,
});

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
    const res = await axios.get('http://172.16.21.118:8080/api/landmark');
    const landmarks = res.data;
    dispatch(getLandmarks(landmarks));
  } catch (err) {
    console.log('error in thunk creator: ', err);
  }
};

// export const fetchLandmark = id => async dispatch => {
//   try {
//     const res = await axios.get(`http://172.16.21.118:8080/api/landmark/${id}`);
//     const landmark = res.data;
//     dispatch(getLandmark(landmark));
//   } catch (err) {
//     console.log('error in thunk creator: ', err);
//   }
// };

export const fetchUserLandmark = userId => async dispatch => {
  try {
    console.log('fetch user landmark thunk start.. ');
    const res = await axios.get(
      `http://172.16.21.118:8080/api/landmark/${userId}`
    );
    const landmarks = res.data;
    dispatch(getUserLandmark(landmarks));
  } catch (err) {
    console.log('error in thunk creator: ', err);
  }
};

export const createLandmark = landmark => async dispatch => {
  try {
    const res = await axios.post(
      `http://172.16.21.118:8080/api/landmark`,
      landmark
    );
    const newlandmark = res.data;
    dispatch(addLandmark(newlandmark));
  } catch (err) {
    console.log('error in thunk creator: ', err);
  }
};

export default function(state = [], action) {
  switch (action.type) {
    // case GET_LANDMARK:
    //   return
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
