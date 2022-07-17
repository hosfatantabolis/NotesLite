import './Search.css';
import { searchNoteAction } from '../../store/noteReducer';
import { useDispatch } from 'react-redux';
import ModeCheckbox from '../ModeCheckbox/ModeCheckbox';

export const Search = ({ handleNewNoteClick }) => {
    const dispatch = useDispatch();

    const searchNote = (text) => {
        dispatch(searchNoteAction({ text }));
    }
    return (
        <div className="search">
            <ModeCheckbox />
            <input
                className='search__input'
                type="text"
                placeholder="Поиск..."
                onChange={(e) =>
                    searchNote(e.target.value)
                } />
            <button className="search__new-note-btn" onClick={() => { handleNewNoteClick() }}></button>
        </div>

    );
}