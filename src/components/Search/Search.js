import './Search.css';
import { searchNoteAction } from '../../store/noteReducer';
import { useDispatch } from 'react-redux';

export const Search = ({ handleSearch }) => {
    const dispatch = useDispatch();

    const searchNote = (text) => {
        dispatch(searchNoteAction({ text }));
    }
    return (
        <div className="search__container">
            <input
                className='search__input'
                type="text"
                placeholder="Поиск..."
                onChange={(e) =>
                    searchNote(e.target.value)
                } />
            <button className="search__button"></button>
        </div>

    );
}