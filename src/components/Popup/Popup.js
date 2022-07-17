import './Popup.css';
import { useDispatch } from 'react-redux';
import { deleteNoteAction, editNoteAction, addNoteAction } from '../../store/noteReducer';
import { DEFAULT_COLOR, PURPLE, RED, GREEN, BLUE, NEW_MODE } from "../../utils/constants";
import { useEffect, useState } from 'react';
import { ToDoList } from '../ToDoList/ToDoList';
export const Popup = ({ note, isOpen, setIsOpen, popupAction }) => {
    // console.log(note);
    const [selectedNote, setSelectedNote] = useState("");
    const [listVisible, setListVisible] = useState(false);
    useEffect(() => {
        setSelectedNote(note);
    }, [note, isOpen]);

    useEffect(() => {
        if (selectedNote && selectedNote.type === 'list') {
            setListVisible(true);
        }
    }, [selectedNote])

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
        setListVisible(false);
        setIsOpen(false);
    }
    function handleSubmit(e, note) {
        e.preventDefault();
        editNote(note);
        // setSelectedNote("");
        // setIsOpen(false);
        closeNoteEditor();
    }

    function handleCreateNew(e, note) {
        e.preventDefault();
        dispatch(addNoteAction(note));
        setSelectedNote("");
        setIsOpen(false);
    }

    const toggleList = () => {
        changeNoteType(selectedNote);
        // setListVisible(!listVisible);
    }

    function convertToList(text) {
        let list = text.split("\n");
        let obj = [];
        list.forEach((item, index) => {
            obj = [...obj, { id: index, text: item, done: false }]
        })
        // console.log(obj);
        setListVisible(true);
        setSelectedNote({ ...selectedNote, type: "list", list: obj });
        // setSelectedNote({ ...selectedNote, color: color });

    }

    function convertToText(list) {
        let text;
        list.forEach((item, index) => {
            if (index === 0) {
                text = item.text
            }
            else {
                text = text + '\n' + item.text
            }
        })
        // console.log(text);
        setListVisible(false);
        setSelectedNote({ ...selectedNote, type: "text", list: [], text: text });
    }

    function changeNoteType(note) {
        // note.type === "text" ? setSelectedNote({ ...note, type: "list" }) : setSelectedNote({ ...note, type: "text" });
        if (selectedNote.text && selectedNote.type === "text") {
            convertToList(note.text);
        }
        if (selectedNote.list && selectedNote.type === "list") {
            convertToText(note.list);
        }
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
                    {(selectedNote && selectedNote.type === 'text') && <textarea
                        placeholder='Текст заметки'
                        className={`popup__input popup__input_text ${(selectedNote && selectedNote.type === "list") ? "popup__input_hidden" : ""}`}
                        value={selectedNote ? selectedNote.text : ""}
                        onChange={(e) => { handleNoteTextChange(e) }}></textarea>}

                    <ToDoList isVisible={listVisible} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
                    <div className='popup__color-picker_container'>
                        <button
                            className='popup__button popup__button_list'
                            type='button'
                            title='Добавить список'
                            onClick={() => toggleList()}></button>
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