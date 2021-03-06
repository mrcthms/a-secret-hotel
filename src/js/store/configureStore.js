import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

var finalCreateStore = compose(
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)(createStore);

var createStoreWithMiddleware = applyMiddleware(
  thunk
)(finalCreateStore);

var configureStore = function (intialState) {
  return createStoreWithMiddleware(rootReducer, intialState);
};

export default configureStore;
