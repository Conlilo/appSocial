import { combineReducers } from 'redux';
import { activelikebuttonReducer } from '../slices/activeLikeButton';
import { commentReducer } from '../slices/comment';
import { currentProductReducer } from '../slices/currentProduct';
import { dataReducer } from '../slices/dataApi';
import { flagReducer } from '../slices/flag';

const rootReducer = combineReducers({
  activelikebutton: activelikebuttonReducer,
  data: dataReducer,
  currentproduct: currentProductReducer,
  comment: commentReducer,
  flag: flagReducer,
});

export default rootReducer;
