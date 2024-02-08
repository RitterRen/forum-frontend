import { combineReducers } from 'redux';
import postReducer from './post.reducer';
import userReducer from './user.reducer';

// Simple root reducer
// Map each slice of state name to its reducer

export default combineReducers({ post: postReducer, user: userReducer });
