const defaultState = {
    cash: 7,
  }

const ADD_CASH = "ADD_CASH";
const TAKE_CASH = "TAKE_CASH";

export const cashReducer = (state = defaultState, action) => {
    switch (action.type) {
      case ADD_CASH: return {...state, cash: state.cash + action.payload}
      case TAKE_CASH: return {...state, cash: state.cash - action.payload}
      default: return state;
    }
};

export const addCashAction = (payload) => ({type: ADD_CASH, payload});
export const removeCashAction = (payload) => ({type: TAKE_CASH, payload});