import { combineReducers } from 'redux';
import auth from './auth';
import landmark from './landmark';

export default combineReducers({
  auth, landmark
});
