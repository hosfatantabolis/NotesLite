import React from 'react';
import './ModeCheckbox.css';
import light from "../../images/buttons/sun.svg"
import dark from "../../images/buttons/moon.svg"
import { useDispatch, useSelector } from 'react-redux';
import { switchThemeAction } from '../../store/modeReducer';
import { THEME_DARK, THEME_LIGHT } from '../../utils/constants';

function ModeCheckbox() {
    const theme = useSelector(state => state.theme.theme);
    const dispatch = useDispatch();
    function changeMode() {
        theme === THEME_DARK ? dispatch(switchThemeAction(THEME_LIGHT)) : dispatch(switchThemeAction(THEME_DARK))
    }
    return (
        <div className='mode-checkbox'>
            <img className={`mode-checkbox__img ${theme === THEME_DARK ? "mode-checkbox__img_theme-dark" : ""}`} src={light} alt="светлая тема" />
            <label className='mode-checkbox__label'>
                <input
                    className='mode-checkbox__input'
                    type='checkbox'
                    onClick={() => {
                        changeMode();
                    }}
                />
                <span className='mode-checkbox__slider'></span>
            </label>
            <img className={`mode-checkbox__img ${theme === THEME_DARK ? "mode-checkbox__img_theme-dark" : ""}`} src={dark} alt="темная тема" />
        </div>
    );
}

export default ModeCheckbox;