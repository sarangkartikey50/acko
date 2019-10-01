import rootReducer from "./reducers/";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

export const store = createStore(rootReducer, applyMiddleware(logger, thunk));
