import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
// import { cashReducer } from './cashReducer';
// import { customerReducer } from './customerReducer';
import { noteReducer } from './noteReducer';
import { themeReducer } from './modeReducer';

const rootReducer = combineReducers({
    // cash: cashReducer,
    // customers: customerReducer,
    notes: noteReducer,
    theme: themeReducer,
});

export const store = configureStore({ reducer: rootReducer });