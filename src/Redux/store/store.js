import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import userReducer from "../reducer/userReducer";
import postsReducer from "../reducer/postsReducer";

const rootReducer = combineReducers({
  userState: userReducer,
  postState: postsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
