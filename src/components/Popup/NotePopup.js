import './NotePopup.css';
import { useDispatch } from 'react-redux';
import { deleteNoteAction, editNoteAction, addNoteAction } from '../../store/noteReducer';
import { DEFAULT_COLOR, PURPLE, RED, GREEN, BLUE, NEW_MODE } from "../../utils/constants";
import { useEffect, useState } from 'react';
export const NotePopup = ({ note, isOpen, setIsOpen, popupAction }) => {
    const [selectedNote, setSelectedNote] = useState("");
    useEffect(() => {
        setSelectedNote(note);
    }, [note, isOpen]);

    const dispatch = useDispatch();

    const editNote = (note) => {
        dispatch(editNoteAction({ note }));
    }

    const deleteNote = (note) => {
        dispatch(deleteNoteAction(note.id));
        setSelectedNote("");
        setIsOpen(false);
    };

    const handleNoteTitleChange = (e) => {
        setSelectedNote({ ...selectedNote, title: e.target.value });
    }
    const handleNoteTextChange = (e) => {
        setSelectedNote({ ...selectedNote, text: e.target.value });
    }

    const handleNoteColorChange = (color) => {
        setSelectedNote({ ...selectedNote, color: color });
    }

    function closeNoteEditor() {
        setSelectedNote("");
        setIsOpen(false);
    }
    function handleSubmit(e, selectedNote) {
        e.preventDefault();
        editNote(selectedNote);
        setSelectedNote("");
        setIsOpen(false);
    }

    function handleCreateNew(e, selectedNote) {
        e.preventDefault();
        dispatch(addNoteAction(selectedNote));
        setSelectedNote("");
        setIsOpen(false);
    }

    return (
        <div className={`note__editor_wrapper ${!isOpen ? "note__editor_wrapper_hidden" : ""}`}>
            <div className='note__editor_container'>
                <button className='note__editor_close-btn' onClick={() => { closeNoteEditor() }}></button>
                <form className='note__editor' onSubmit={(e) => {
                    popupAction === NEW_MODE ? handleCreateNew(e, selectedNote) : handleSubmit(e, selectedNote)
                }} action='submit' noValidate>
                    {popupAction === NEW_MODE ? <h2>Новая заметка</h2> : <h2>Редактировать заметку</h2>}

                    <input placeholder='Название' className='note__input note__title_input-field' value={selectedNote ? selectedNote.title : ""} onChange={(e) => { handleNoteTitleChange(e) }}></input>
                    <textarea placeholder='Текст заметки' className='note__input note__text_input-field' value={selectedNote ? selectedNote.text : ""} onChange={(e) => { handleNoteTextChange(e) }}></textarea>
                    <div className='note__color-picker_container'>
                        <div className={`note__color-picker note__color-picker_default `} onClick={() => handleNoteColorChange(DEFAULT_COLOR)}></div> {/*${(note.color === DEFAULT_COLOR || selectedNote.color === DEFAULT_COLOR) ? "note__color-picker_active" : ""} */}
                        <div className={`note__color-picker note__color-picker_purple `} onClick={() => handleNoteColorChange(PURPLE)}></div>{/*${(note.color === PURPLE || selectedNote.color === PURPLE) ? "note__color-picker_active" : ""}*/}
                        <div className={`note__color-picker note__color-picker_red `} onClick={() => handleNoteColorChange(RED)}></div>{/*${(note.color === RED || selectedNote.color === RED) ? "note__color-picker_active" : ""}*/}
                        <div className={`note__color-picker note__color-picker_green `} onClick={() => handleNoteColorChange(GREEN)}></div>{/*${(note.color === GREEN || selectedNote.color === GREEN) ? "note__color-picker_active" : ""}*/}
                        <div className={`note__color-picker note__color-picker_blue `} onClick={() => handleNoteColorChange(BLUE)}></div>{/*${(note.color === BLUE || selectedNote.color === BLUE) ? "note__color-picker_active" : ""}*/}
                        <button className="note__delete-button" type="button" onClick={() => deleteNote(note)}></button>
                    </div>
                    <button className="note__editor_save-btn" type='submit'></button>
                </form>
            </div>
        </div>
    )
}