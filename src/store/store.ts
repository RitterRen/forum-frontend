import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './reducers';

export default createStore(rootReducer, {}, composeWithDevTools());

// --------------------------------------------------------------------------------------
// // With Thunks
// import { applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';

// export default createStore(
//   rootReducer,
//   {},
//   composeWithDevTools(applyMiddleware(thunk)),
// );

// --------------------------------------------------------------------------------------
// General action creator
export const createAction = (type: string, payload: any) => ({ type, payload });