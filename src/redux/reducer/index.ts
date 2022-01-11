import { combineReducers } from 'redux';
import { activelikebuttonReducer } from '../slices/activeLikeButton';
import { dataReducer } from '../slices/dataApi';

const rootReducer = combineReducers({
  activelikebutton: activelikebuttonReducer,
  data: dataReducer,
});

export default rootReducer;
