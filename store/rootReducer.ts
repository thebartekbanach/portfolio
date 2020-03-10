import environment from "./environment/reducer";
import translations from "./translations/reducer";
import { CombinedState, combineReducers, Reducer } from "redux";

const rootReducer = combineReducers({
	environment,
	translations
});

export default rootReducer;
