import { combineReducers } from 'redux';
import auth from './auth';
import thing from './thing';
// import location from './location'

export default combineReducers({
  auth, landmark, thing
  // , location
});
