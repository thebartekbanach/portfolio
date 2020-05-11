import { combineReducers } from "redux";
import images from "./images/reducers";
import language from "./language/reducers";
import navbar from "./navbar/reducers";
import skills from "./skills/reducers";

const rootReducer = combineReducers({
	images,
	language,
	navbar,
	skills
});

export default rootReducer;
