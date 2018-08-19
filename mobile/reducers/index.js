import { combineReducers } from 'redux';
import auth from './auth';
import landmark from './landmark';
import thing from './thing';

export default combineReducers({
  auth, landmark, thing
});
