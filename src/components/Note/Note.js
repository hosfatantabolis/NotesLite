import './Note.css';
import { DEFAULT_COLOR } from '../../utils/constants';
export const Note = ({ note, handleNoteClick }) => {

    return (
        <div className="note" style={note.color ? { backgroundColor: note.color } : { backgroundColor: DEFAULT_COLOR }} onClick={() => { handleNoteClick(note) }}>
            <h2 className="note__title">{note.title}</h2>
            <p className="note__text">{note.text}</p>
            <span className="note__date-created">{note.dateCreated}</span>
        </div>
    )
}