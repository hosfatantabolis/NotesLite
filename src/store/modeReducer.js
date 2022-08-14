import { THEME_LIGHT } from "../utils/constants";

const defaultState = {
    theme: THEME_LIGHT,
}

const SWITCH_THEME = "SWITCH_THEME";

let theme;
localStorage.getItem("theme") ? theme = { theme: JSON.parse(localStorage.getItem('theme')) } : theme = defaultState;

export const themeReducer = (state = theme, action) => {
    switch (action.type) {
        case SWITCH_THEME: return { ...state, theme: action.payload }
        default: return state;
    }
};

export const switchThemeAction = (payload) => ({ type: SWITCH_THEME, payload });