import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import musicReducer from "./musicReducer";
import playerReducer from "./playerReducer";
import commentReducer from "./commentReducer";
import messageReducer from "./messageReducer";
import genreReducer from "./genreReducer";
import pageReducer from "./pageReducer";

const rootReducer= combineReducers({
    user:userReducer,
    musics:musicReducer,
    player:playerReducer,
    comments:commentReducer,
    message:messageReducer,
    genre:genreReducer,
    page:pageReducer
})
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))