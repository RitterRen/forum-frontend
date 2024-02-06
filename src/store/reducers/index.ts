import { combineReducers } from 'redux';
import postReducer from './post.reducer';

// Simple root reducer
// Map each slice of state name to its reducer

export default combineReducers({ post: postReducer });
