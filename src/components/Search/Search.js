import './Search.css';
import { searchNoteAction } from '../../store/noteReducer';
import { useDispatch } from 'react-redux';

export const Search = () => {
    const dispatch = useDispatch();

    const searchNote = (text) => {
        dispatch(searchNoteAction({ text }));
    }
    return (
        <div className="search">
            <span className="search__img"></span>
            <input
                className='search__input'
                type="text"
                placeholder="Поиск..."
                onChange={(e) =>
                    searchNote(e.target.value)
                } />
        </div>

    );
}