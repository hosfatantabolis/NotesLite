import { MODE_LIGHT } from "../utils/constants";

const defaultState = {
    mode: MODE_LIGHT,
}

const SWITCH_MODE = "SWITCH_MODE";

export const modeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SWITCH_MODE: return { ...state, mode: action.payload }
        default: return state;
    }
};

export const switchModeAction = (payload) => ({ type: SWITCH_MODE, payload });