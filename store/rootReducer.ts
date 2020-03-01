import { CombinedState, combineReducers, Reducer } from "redux";
import { counterReducer } from "./counter/reducer";

const rootReducer = combineReducers({
	count: counterReducer
});

export default rootReducer;
