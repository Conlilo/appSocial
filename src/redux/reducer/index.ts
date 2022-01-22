import { combineReducers } from 'redux';
import { activelikebuttonReducer } from '../slices/activeLikeButton';
import { currentProductReducer } from '../slices/currentProduct';
import { dataReducer } from '../slices/dataApi';

const rootReducer = combineReducers({
  activelikebutton: activelikebuttonReducer,
  data: dataReducer,
  currentproduct: currentProductReducer,
});

export default rootReducer;
