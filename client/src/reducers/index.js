import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import musicReducer from "./musicReducer";
import playerReducer from "./playerReducer";
import commentReducer from "./commentReducer";
import errorReducer from "./errorReducer";
import genreReducer from "./genreReducer";
import playlistReducer from "./playlistReducer";
import roleReducer from "./roleReducer";
import albumReducer from "./albumsReducer";
import messageReducer from "./messageReducer";

const rootReducer= combineReducers({
    user:userReducer,
    musics:musicReducer,
    player:playerReducer,
    comments:commentReducer,
    message:messageReducer,
    error:errorReducer,
    genre:genreReducer,
    playlist:playlistReducer,
    roles:roleReducer,
    albums:albumReducer
})
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))