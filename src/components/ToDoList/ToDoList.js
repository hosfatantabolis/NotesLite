import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { THEME_DARK } from "../../utils/constants";
import './ToDoList.css';

export const ToDoList = ({ selectedNote, setSelectedNote }) => {
    const [value, setValue] = useState({});
    const [isDisabled, setIsDisabled] = useState(true);
    const theme = useSelector(state => state.theme.theme);

    const textInput = useRef();

    const handleAddItem = () => {
        setSelectedNote({ ...selectedNote, list: [...selectedNote.list, value], done: false });
        setValue({});
        setIsDisabled(true);
        textInput.current.value = '';
        // console.log(selectedNote.list);
    }

    const handleChange = (e) => {
        e.target.value && setIsDisabled(false);
        setValue({ ...value, id: Date.now(), text: e.target.value });
    }

    const handleEdit = (e, item) => {
        // setValue({ ...value, id: Date.now(), text: e.target.textContent });
        // console.log(item)
        setSelectedNote({
            ...selectedNote, list: selectedNote.list.map(listItem => {
                return listItem.id === item.id ? { ...listItem, text: e.target.textContent } : listItem
            })
        })
    }

    const handleDeleteItem = (e, item) => {
        // console.log(item);
        setSelectedNote({ ...selectedNote, list: selectedNote.list.filter(listItem => listItem.id !== item.id) })
    }

    const handleCheck = (e, item) => {
        // console.log(item);
        setSelectedNote({
            ...selectedNote, list: selectedNote.list.map(listItem => {
                return listItem.id === item.id ? { ...listItem, done: !listItem.done } : listItem
            })
        })
    }
    return (
        <div name="todo" className={`todo ${(selectedNote && selectedNote.list.length > 0) ? "" : "todo_hidden"}`}>
            <div className='todo__container'>
                <input className={`todo__input ${theme === THEME_DARK ? "todo__input_theme-dark" : ""}`} type="text" placeholder='Добавить элемент списка' ref={textInput} onChange={(e) => { handleChange(e) }}></input>
                <button className={`todo__button todo__button_add ${theme === THEME_DARK ? "todo__button_theme-dark" : ""}`} type='button' onClick={handleAddItem} disabled={isDisabled} />
            </div>
            <ul className="todo__list">
                {(selectedNote && selectedNote.list.length > 0) && selectedNote.list.map((item) => {

                    // console.log(item)
                    return <li className='todo__list_item' key={item.id}>
                        <input type="checkbox" checked={item.done || false} onChange={(e) => { handleCheck(e, item) }} />
                        <span className={`todo__list_item_text ${item.done ? "todo__list_item_text-done" : ""}`} onBlur={(e) => handleEdit(e, item)} suppressContentEditableWarning={true} contentEditable>{item.text}</span>
                        <button className={`todo__button todo__button_delete ${theme === THEME_DARK ? "todo__button_theme-dark" : ""}`} type="button" onClick={(e) => { handleDeleteItem(e, item) }}></button>
                    </li>

                })}
            </ul>
        </div>
    )
}