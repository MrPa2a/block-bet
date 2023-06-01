import { UPDATE_WAGER, RESET_WAGER, UPDATE_MULTIPLE_BETS } from "../actionTypes";

// WAGER
const updateWager = (value) => {
  return {
    type: UPDATE_WAGER,
    payload: value
  };
};

const resetWager = () => {
  return {
    type: RESET_WAGER,
  };
};

// MULTIPLE BETS
const updateMultipleBets = (value) => {
  return {
    type: UPDATE_MULTIPLE_BETS,
    payload: value
  };
};

export { updateWager, resetWager, updateMultipleBets };