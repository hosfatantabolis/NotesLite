import './Popup.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, editNoteAction, addNoteAction, editSelectedNoteAction } from '../../store/noteReducer';
import { DEFAULT_COLOR, PURPLE, RED, GREEN, BLUE, NEW_MODE, THEME_DARK } from "../../utils/constants";
import { ToDoList } from '../ToDoList/ToDoList';
export const Popup = ({ note, isOpen, setIsOpen, popupAction }) => {
    const theme = useSelector(state => state.theme.theme);
    const selectedNote = useSelector(state => state.notes.selectedNote);
    const dispatch = useDispatch();

    const editNote = (note) => {
        dispatch(editNoteAction({ note }));
    }

    const deleteNote = (note) => {
        dispatch(deleteNoteAction(note.id));
        dispatch(editSelectedNoteAction({}));
        setIsOpen(false);
    };

    const handleNoteTitleChange = (e) => {
        dispatch(editSelectedNoteAction({ ...selectedNote, title: e.target.value }));
    }
    const handleNoteTextChange = (e) => {
        dispatch(editSelectedNoteAction({ ...selectedNote, text: e.target.value }));
    }

    const handleNoteColorChange = (color) => {
        dispatch(editSelectedNoteAction({ ...selectedNote, color: color }));
    }

    function closeNoteEditor() {
        dispatch(editSelectedNoteAction({}));
        setIsOpen(false);
    }
    function handleSubmit(e, note) {
        e.preventDefault();
        editNote(note);
        closeNoteEditor();
    }

    function handleCreateNew(e, note) {
        e.preventDefault();
        dispatch(addNoteAction(note));
        dispatch(editSelectedNoteAction({}));
        setIsOpen(false);
    }

    const toggleList = () => {
        changeNoteType(selectedNote);
    }

    function convertToList(text) {
        let list = text.split("\n");
        let obj = [];
        list.forEach((item, index) => {
            obj = [...obj, { id: index, text: item, done: false }]
        })
        dispatch(editSelectedNoteAction({ ...selectedNote, type: "list", list: obj }));
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
        dispatch(editSelectedNoteAction({ ...selectedNote, type: "text", list: [], text: text }));
    }

    function changeNoteType(note) {
        if (selectedNote.text && selectedNote.type === "text") {
            convertToList(note.text);
        }
        if (selectedNote.list && selectedNote.type === "list") {
            convertToText(note.list);
        }
    }

    return (
        isOpen && <div className={`popup ${theme === THEME_DARK ? "popup_theme-dark" : ""}`}>
            <div className={`popup__container ${theme === THEME_DARK ? "popup__container_theme-dark" : ""}`}>
                <button
                    className={`popup__button popup__button_close ${theme === THEME_DARK ? "popup__button_theme-dark" : ""}`}
                    title='Закрыть'
                    onClick={() => { closeNoteEditor() }}></button>
                <form className='popup__form' onSubmit={(e) => {
                    popupAction === NEW_MODE ? handleCreateNew(e, selectedNote) : handleSubmit(e, selectedNote)
                }} action='submit' noValidate>
                    {popupAction === NEW_MODE ? <h2 className='popup__form_title'>Новая заметка</h2> : <h2 className='popup__form_title'>Редактировать заметку</h2>}

                    <input
                        placeholder='Название'
                        className={`popup__input popup__input_title ${theme === THEME_DARK ? "popup__input_theme-dark" : ""}`}
                        value={selectedNote ? selectedNote.title : ""}
                        onChange={(e) => { handleNoteTitleChange(e) }} />
                    {(selectedNote && selectedNote.type === 'text') && <textarea
                        placeholder='Текст заметки'
                        className={`popup__input popup__input_text ${(selectedNote && selectedNote.type === "list") ? "popup__input_hidden" : ""} ${theme === THEME_DARK ? "popup__input_theme-dark" : ""}`}
                        value={selectedNote ? selectedNote.text : ""}
                        onChange={(e) => { handleNoteTextChange(e) }}></textarea>}

                    <ToDoList />
                    <div className='popup__color-picker_container'>
                        <button
                            className={`popup__button popup__button_list ${theme === THEME_DARK ? "popup__button_theme-dark" : ""}`}
                            type='button'
                            title='Добавить список'
                            onClick={() => toggleList()}></button>
                        <div className={`popup__color-picker popup__color-picker_default `} onClick={() => handleNoteColorChange(DEFAULT_COLOR)}></div> {/*${(note.color === DEFAULT_COLOR || selectedNote.color === DEFAULT_COLOR) ? "note__color-picker_active" : ""} */}
                        <div className={`popup__color-picker popup__color-picker_purple `} onClick={() => handleNoteColorChange(PURPLE)}></div>{/*${(note.color === PURPLE || selectedNote.color === PURPLE) ? "note__color-picker_active" : ""}*/}
                        <div className={`popup__color-picker popup__color-picker_red `} onClick={() => handleNoteColorChange(RED)}></div>{/*${(note.color === RED || selectedNote.color === RED) ? "note__color-picker_active" : ""}*/}
                        <div className={`popup__color-picker popup__color-picker_green `} onClick={() => handleNoteColorChange(GREEN)}></div>{/*${(note.color === GREEN || selectedNote.color === GREEN) ? "note__color-picker_active" : ""}*/}
                        <div className={`popup__color-picker popup__color-picker_blue `} onClick={() => handleNoteColorChange(BLUE)}></div>{/*${(note.color === BLUE || selectedNote.color === BLUE) ? "note__color-picker_active" : ""}*/}
                        <button
                            className={`popup__button popup__button_delete ${theme === THEME_DARK ? "popup__button_theme-dark" : ""}`}
                            type="button"
                            title='Удалить'
                            onClick={() => deleteNote(note)}></button>
                    </div>
                    <button
                        className={`popup__button popup__button_save ${theme === THEME_DARK ? "popup__button_theme-dark" : ""}`}
                        type='submit'
                        title='Сохранить'></button>
                </form>
            </div>
        </div>
    )
}