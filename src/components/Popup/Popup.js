import './Popup.css';
import { useDispatch } from 'react-redux';
import { deleteNoteAction, editNoteAction, addNoteAction } from '../../store/noteReducer';
import { DEFAULT_COLOR, PURPLE, RED, GREEN, BLUE, NEW_MODE } from "../../utils/constants";
import { useEffect, useState } from 'react';
export const Popup = ({ note, isOpen, setIsOpen, popupAction }) => {
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
        <div className={`popup ${!isOpen ? "popup_hidden" : ""}`}>
            <div className='popup__container'>
                <button
                    className='popup__button popup__button_close'
                    title='Закрыть'
                    onClick={() => { closeNoteEditor() }}></button>
                <form className='popup__form' onSubmit={(e) => {
                    popupAction === NEW_MODE ? handleCreateNew(e, selectedNote) : handleSubmit(e, selectedNote)
                }} action='submit' noValidate>
                    {popupAction === NEW_MODE ? <h2 className='popup__form_title'>Новая заметка</h2> : <h2 className='popup__form_title'>Редактировать заметку</h2>}

                    <input
                        placeholder='Название'
                        className='popup__input popup__input_title'
                        value={selectedNote ? selectedNote.title : ""}
                        onChange={(e) => { handleNoteTitleChange(e) }}></input>
                    <textarea
                        placeholder='Текст заметки'
                        className='popup__input popup__input_text'
                        value={selectedNote ? selectedNote.text : ""}
                        onChange={(e) => { handleNoteTextChange(e) }}></textarea>
                    <div className='popup__color-picker_container'>
                        <button
                            className='popup__button popup__button_list'
                            type='button'
                            title='Добавить список'></button>
                        <div className={`popup__color-picker popup__color-picker_default `} onClick={() => handleNoteColorChange(DEFAULT_COLOR)}></div> {/*${(note.color === DEFAULT_COLOR || selectedNote.color === DEFAULT_COLOR) ? "note__color-picker_active" : ""} */}
                        <div className={`popup__color-picker popup__color-picker_purple `} onClick={() => handleNoteColorChange(PURPLE)}></div>{/*${(note.color === PURPLE || selectedNote.color === PURPLE) ? "note__color-picker_active" : ""}*/}
                        <div className={`popup__color-picker popup__color-picker_red `} onClick={() => handleNoteColorChange(RED)}></div>{/*${(note.color === RED || selectedNote.color === RED) ? "note__color-picker_active" : ""}*/}
                        <div className={`popup__color-picker popup__color-picker_green `} onClick={() => handleNoteColorChange(GREEN)}></div>{/*${(note.color === GREEN || selectedNote.color === GREEN) ? "note__color-picker_active" : ""}*/}
                        <div className={`popup__color-picker popup__color-picker_blue `} onClick={() => handleNoteColorChange(BLUE)}></div>{/*${(note.color === BLUE || selectedNote.color === BLUE) ? "note__color-picker_active" : ""}*/}
                        <button
                            className="popup__button popup__button_delete"
                            type="button"
                            title='Удалить'
                            onClick={() => deleteNote(note)}></button>
                    </div>
                    <button
                        className="popup__button popup__button_save"
                        type='submit'
                        title='Сохранить'></button>
                </form>
            </div>
        </div>
    )
}