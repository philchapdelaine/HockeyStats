import { combineReducers } from "redux";
import canadiensReducer from "./reducers/canadiensReducer";
import standingsReducer from "./reducers/standingsReducer";
import playerReducer from "./reducers/playerReducer";

// This is where you import all the reducers and combine it into one
export default combineReducers({
    canadiensReducer: canadiensReducer,
    standingsReducer: standingsReducer,
    playerReducer: playerReducer
});