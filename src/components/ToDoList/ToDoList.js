import { useState, useRef } from 'react';
// import { useDispatch } from 'react-redux';
// import { editNoteAction } from '../../store/noteReducer';

import './ToDoList.css';
export const ToDoList = ({ selectedNote, setSelectedNote, isVisible }) => {
    const [value, setValue] = useState({});
    const textInput = useRef();

    const handleAddItem = () => {
        setSelectedNote({ ...selectedNote, list: [...selectedNote.list, value], done: false });
        setValue({});
        textInput.current.value = '';
        console.log(selectedNote.list);
    }

    const handleChange = (e) => {
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
        console.log(item);
        setSelectedNote({ ...selectedNote, list: selectedNote.list.filter(listItem => listItem.id !== item.id) })
    }

    const handleCheck = (e, item) => {
        console.log(item);
        setSelectedNote({
            ...selectedNote, list: selectedNote.list.map(listItem => {
                return listItem.id === item.id ? { ...listItem, done: !listItem.done } : listItem
            })
        })
    }
    return (
        <div name="todo" className={`todo ${isVisible ? "" : "todo_hidden"}`}>
            <input type="text" ref={textInput} onChange={(e) => { handleChange(e) }}></input>
            <button type='button' onClick={handleAddItem}>Add</button>
            <ul className="todo__list">
                {(selectedNote && selectedNote.list.length > 0) && selectedNote.list.map((item, index) => {

                    // console.log(item)
                    return <li className='todo__list_item' key={item.id}>
                        <input type="checkbox" checked={item.done || false} onChange={(e) => { handleCheck(e, item) }} />
                        <span className='todo__list_item_text' onBlur={(e) => handleEdit(e, item)} suppressContentEditableWarning={true} contentEditable>{item.text}</span>
                        <button type="button" onClick={(e) => { handleDeleteItem(e, item) }}>Del</button>
                    </li>

                })}
            </ul>
        </div>
    )
}