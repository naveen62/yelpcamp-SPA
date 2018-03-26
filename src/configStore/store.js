import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

import campReducer from '../reducers/campReducer';

export default  () => {
    const store = createStore(combineReducers({
        camps: campReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
)
  return store 
}