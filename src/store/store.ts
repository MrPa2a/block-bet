import { createStore } from "redux";
import { betReducer } from "./bets/betReducer";

const store = createStore(betReducer);

export default store;