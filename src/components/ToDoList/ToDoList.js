import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { editNoteAction } from '../../store/noteReducer';

import './ToDoList.css';
export const ToDoList = ({ selectedNote, setSelectedNote, isVisible }) => {
    const [value, setValue] = useState('');
    // const dispatch = useDispatch();
    const handleAddItem = () => {
        setSelectedNote({ ...selectedNote, list: [...selectedNote.list, value] });
        console.log(selectedNote);
    }

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleDeleteItem = (index) => {
        console.log(selectedNote.list[index]);

        setSelectedNote({ ...selectedNote, list: [...selectedNote.list] })
        // dispatch(editNoteAction())
    }

    const handleCheck = (e, item) => {
        console.log(item);
        setSelectedNote({ ...selectedNote, list: selectedNote.list.filter(item => item.id !== selectedNote) })
    }
    return (
        <div name="todo" className={`todo ${isVisible ? "" : "todo_hidden"}`}>
            <input type="text" onChange={(e) => { handleChange(e) }}></input>
            <button type='button' onClick={handleAddItem}>Add</button>
            <ul className="todo__list">
                {(selectedNote && selectedNote.list.length > 0) && selectedNote.list.map((item) => {

                    // console.log(item)
                    return <li key={item.id}>
                        <input type="checkbox" checked={item.done} onChange={e => { handleCheck(e, item) }}></input>
                        {item.text}
                        <button type="button" onClick={() => { handleDeleteItem() }}>Del</button>
                    </li>

                })}
            </ul>
        </div>
    )
}