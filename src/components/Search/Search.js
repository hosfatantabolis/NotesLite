import './Search.css';
import { searchNoteAction } from '../../store/noteReducer';
import { useDispatch, useSelector } from 'react-redux';
import ModeCheckbox from '../ModeCheckbox/ModeCheckbox';
import { THEME_DARK } from '../../utils/constants';

export const Search = ({ handleNewNoteClick }) => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme.theme);


    const searchNote = (text) => {
        dispatch(searchNoteAction({ text }));
    }
    return (
        <div className="search">
            <ModeCheckbox />
            <input
                className={`search__input ${theme === THEME_DARK ? 'search__input_theme-dark' : ''}`}
                type="text"
                placeholder="Поиск..."
                onChange={(e) =>
                    searchNote(e.target.value)
                } />
            <button className="search__new-note-btn" onClick={() => { handleNewNoteClick() }}></button>
        </div>

    );
}