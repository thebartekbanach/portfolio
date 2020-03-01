import rootReducer from "./rootReducer";
import { CombinedState, Reducer } from "redux";

type Unpacked<T> = T extends Reducer<CombinedState<infer U>> ? U : T;
export type Store = Unpacked<typeof rootReducer>;
