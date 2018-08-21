import { combineReducers } from 'redux';
import auth from './auth';
import landmark from './landmark';
import thing from './thing';
import searchString from './searchString';
import restaurantUrl from './restaurantUrl'

export default combineReducers({
  auth, landmark, thing, searchString, restaurantUrl
});
