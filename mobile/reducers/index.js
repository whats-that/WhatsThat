import { combineReducers } from 'redux';
import auth from './auth';
import landmark from './landmark';
import searchString from './searchString';

export default combineReducers({
  auth, landmark, searchString
});
