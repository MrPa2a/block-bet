import { UPDATE_WAGER, RESET_WAGER, UPDATE_MULTIPLE_BETS } from "../actionTypes";
import { BetState } from "../stateTypes";

const initialState : BetState = {
  MAX: 0.15478,
  wager: 0,
  multipleBets: 1
};

export const betReducer = (state = initialState, action) => {
  switch (action.type) {

    // WAGER
    case UPDATE_WAGER:
      return {
        ...state,
        wager: action.payload,
      };

    case RESET_WAGER:
      return {
        ...state,
        wager: 0,
      };

    // MULTIPLE BETS
    case UPDATE_MULTIPLE_BETS:
      return {
        ...state,
        multipleBets: action.payload,
      };

    // DEFAULT
    default:
      return state;
  }
};