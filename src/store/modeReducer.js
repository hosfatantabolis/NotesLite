import { THEME_LIGHT } from "../utils/constants";

const defaultState = {
    theme: THEME_LIGHT,
}

const SWITCH_THEME = "SWITCH_THEME";

export const themeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SWITCH_THEME: return { ...state, theme: action.payload }
        default: return state;
    }
};

export const switchThemeAction = (payload) => ({ type: SWITCH_THEME, payload });