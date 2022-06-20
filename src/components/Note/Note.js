import './Note.css';
import { useDispatch } from 'react-redux';
import { deleteNoteAction, editNoteAction, editNoteColorAction } from '../../store/noteReducer';
import { DEFAULT_COLOR, PURPLE, RED, GREEN, BLUE } from "../../utils/constants";
export const Note = ({ note, handleNoteClick }) => {
    const dispatch = useDispatch();
    const deleteNote = (note) => {
        dispatch(deleteNoteAction(note.id));
    };
    // const editNote = (note) => {
    //     let text = prompt();
    //     dispatch(editNoteAction({ note, text }));
    // }
    const editNoteColor = (note, color) => {
        dispatch(editNoteColorAction({ note, color }));
    }
    return (
        <div className="note" style={note.color ? { backgroundColor: note.color } : { backgroundColor: '#dd2ae3' }} onClick={() => { handleNoteClick(note) }}>
            <h2 className="note__title">{note.title}</h2>
            <p className="note__text">{note.text}</p> {/*onClick={() => editNote(note)} */}
            <span className="note__date-created">{note.date}</span>
            <span className="note__date-modified">{note.date}</span>
            {/* <div className='note__color-picker_container'>
                <div className='note__color-picker note__color-picker_default' onClick={() => editNoteColor(note, DEFAULT_COLOR)}></div>
                <div className='note__color-picker note__color-picker_purple' onClick={() => editNoteColor(note, PURPLE)}></div>
                <div className='note__color-picker note__color-picker_red' onClick={() => editNoteColor(note, RED)}></div>
                <div className='note__color-picker note__color-picker_green' onClick={() => editNoteColor(note, GREEN)}></div>
                <div className='note__color-picker note__color-picker_blue' onClick={() => editNoteColor(note, BLUE)}></div>
                <button className="note__delete-button" onClick={() => deleteNote(note)}></button>
            </div> */}


        </div>
    )
}