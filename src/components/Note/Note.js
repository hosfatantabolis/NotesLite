import './Note.css';
import { DEFAULT_COLOR } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { editNoteAction, deleteNoteAction } from '../../store/noteReducer';


export const Note = ({ note, handleNoteClick }) => {
    const dispatch = useDispatch();

    return (
        <div className="note" style={note.color ? { backgroundColor: note.color } : { backgroundColor: DEFAULT_COLOR }}>
            <div className='note__edit' onClick={() => { handleNoteClick(note) }}>
                <h3 className="note__title">{note.title}</h3>
                {note.type === "list" ? <ul className='note__list'>
                    {note.list.map(item => {
                        return <li className='note__list_item' key={item.id}>
                            <input type="checkbox" readOnly checked={item.done} /><span className='note__list_item_text'>{item.text}</span></li>
                    })}
                </ul> : <p className="note__text">{note.text}</p>}
            </div>
            <button className={`note__button ${!note.pinned ? 'note__button_pin' : "note__button_unpin"}`} onClick={() => {
                dispatch(editNoteAction({ note: { ...note, pinned: !note.pinned } }));
            }}></button>
            <button className='note__button note__button_delete' onClick={() => {
                dispatch(deleteNoteAction(note.id))
            }}></button>
            <span className="note__date-created">{note.dateCreated}</span>
        </div>
    )
}