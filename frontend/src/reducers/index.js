import { combineReducers } from 'redux';
import {
   CHANGE_MODEL_DATA,
   CHANGE_SEARCH_DATA
} from '../actions';

const initialState = {
   modelData: [],
   searchData: [],
};

function uiReducer(state = initialState, action) {
   switch (action.type) {
      case CHANGE_SEARCH_DATA:
         return Object.assign({}, state, action.payload);
      case CHANGE_MODEL_DATA:
         return Object.assign({}, state, action.payload);
      default:
         return state;
   }
}

const popTopicApp = combineReducers({
   uiReducer,
});

export default popTopicApp;
