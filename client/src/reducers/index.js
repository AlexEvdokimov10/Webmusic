import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import musicReducer from "./musicReducer";

const rootReducer= combineReducers({
    user:userReducer,
    musics:musicReducer
})
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))