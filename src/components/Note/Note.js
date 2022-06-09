import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, editNoteAction } from '../../store/noteReducer';
export const Note = ({ note }) => {
    const dispatch = useDispatch();
    const deleteNote = (note) => {
        dispatch(deleteNoteAction(note.id));
    };
    const editNote = (note) => {
        let text = prompt();
        dispatch(editNoteAction({ note, text }));
    }
    return (
        <div className="note" onClick={() => editNote(note)} style={note.color ? { backgroundColor: note.color } : { backgroundColor: '#dd2ae3' }}>
            <h2 className="note__title">{note.title}</h2>
            <p className="note__text">{note.text}</p>
            <span className="note__date-created">{note.date}</span>
            <span className="note__date-modified">{note.date}</span>
            <button className="note__delete-button" onClick={() => deleteNote(note)}>Del</button>
        </div>
    )
}