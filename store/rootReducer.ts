import { combineReducers } from "redux";
import images from "./images/reducers";
import navbar from "./navbar/reducers";

const rootReducer = combineReducers({
	images,
	navbar
});

export default rootReducer;
