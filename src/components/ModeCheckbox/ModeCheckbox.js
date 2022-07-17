import React from 'react';
import './ModeCheckbox.css';
import light from "../../images/buttons/sun.svg"
import dark from "../../images/buttons/moon.svg"
import { useDispatch, useSelector } from 'react-redux';
import { switchModeAction } from '../../store/modeReducer';
import { MODE_DARK, MODE_LIGHT } from '../../utils/constants';

function ModeCheckbox() {
    const mode = useSelector(state => state.mode.mode);
    const dispatch = useDispatch();
    function changeMode() {
        mode === MODE_DARK ? dispatch(switchModeAction(MODE_LIGHT)) : dispatch(switchModeAction(MODE_DARK))
    }
    return (
        <div className='mode-checkbox'>
            <img className='mode-checkbox_img' src={light} alt="светлая тема" />
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
            <img className='mode-checkbox_img' src={dark} alt="темная тема" />
        </div>
    );
}

export default ModeCheckbox;