import { combineReducers } from 'redux';
import { reducer as questReducer } from 'redux-quest';

export default combineReducers({
  _data_: questReducer
});
