import './NotePopup.css';
import { useDispatch } from 'react-redux';
import { deleteNoteAction, editNoteAction, editNoteColorAction } from '../../store/noteReducer';
import { DEFAULT_COLOR, PURPLE, RED, GREEN, BLUE } from "../../utils/constants";
import { useEffect, useState } from 'react';
export const NotePopup = ({ note, isOpen, setIsOpen }) => {
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

    return (
        <div className={`note__editor_wrapper ${!isOpen ? "note__editor_wrapper_hidden" : ""}`}>

            <div className='note__editor_container'>
                <button className='note__editor_close-btn' onClick={() => { closeNoteEditor() }}></button>
                <form className='note__editor' onSubmit={(e) => { handleSubmit(e, selectedNote) }} action='submit' noValidate>
                    <input className='note__input note__title_input-field' value={selectedNote ? selectedNote.title : ""} onChange={(e) => { handleNoteTitleChange(e) }}></input>
                    <textarea className='note__input note__text_input-field' value={selectedNote ? selectedNote.text : ""} onChange={(e) => { handleNoteTextChange(e) }}></textarea>
                    <div className='note__color-picker_container'>
                        <div className='note__color-picker note__color-picker_default' onClick={() => handleNoteColorChange(DEFAULT_COLOR)}></div>
                        <div className='note__color-picker note__color-picker_purple' onClick={() => handleNoteColorChange(PURPLE)}></div>
                        <div className='note__color-picker note__color-picker_red' onClick={() => handleNoteColorChange(RED)}></div>
                        <div className='note__color-picker note__color-picker_green' onClick={() => handleNoteColorChange(GREEN)}></div>
                        <div className='note__color-picker note__color-picker_blue' onClick={() => handleNoteColorChange(BLUE)}></div>
                        <button className="note__delete-button" type="button" onClick={() => deleteNote(note)}></button>
                    </div>
                    <button type='submit'>Сохранить</button>
                </form>
            </div>
        </div>
    )
}