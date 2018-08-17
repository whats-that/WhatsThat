import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { persistStore, autoRehydrate } from 'redux-persist';
import reducers from '../reducers';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunkMiddleware)
    // autoRehydrate()
  )
);

// persistStore(store, { storage: AsyncStorage });
export default store;

