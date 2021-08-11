import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const midlleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...midlleware),
);

export default store;