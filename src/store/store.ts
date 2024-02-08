import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// export default createStore(rootReducer, {}, composeWithDevTools());


// --------------------------------------------------------------------------------------
// // With Thunks

export default createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk)),
);

// --------------------------------------------------------------------------------------
// General action creator
export const createAction = (type: string, payload: any) => ({ type, payload });