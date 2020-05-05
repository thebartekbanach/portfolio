import { combineReducers } from "redux";
import images from "./images/reducers";
import navbar from "./navbar/reducers";
import sections from "./sections/reducers";

const rootReducer = combineReducers({
	images,
	navbar,
	sections
});

export default rootReducer;
