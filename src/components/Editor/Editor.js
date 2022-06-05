import ReactQuill from 'react-quill';
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addNoteAction } from '../../store/noteReducer';
import 'react-quill/dist/quill.snow.css';
import "./Editor.css"
function Editor() {
    const [value, setValue] = useState();
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.notes);

    const addNote = (note) => {
        dispatch(addNoteAction(note));
        stringToHTML(value)
    }
    const stringToHTML = (str) => {
        let element = new DOMParser().parseFromString(str, "text/html");
        console.log(element.body.firstChild);
        document.getElementById("insertHere").appendChild(element.body.firstChild);
        // return element.body;
    }
    return (
        <>
            <ReactQuill theme="snow" value={value} onChange={setValue} className="editor" />
            <button style={{ marginTop: '100px' }} onClick={() => addNote(value)}>Add Note</button>
            <div id='insertHere'></div>
            {/* {notes.length > 0 ? <div id='insertHere'></div> : <div>NO NOTES</div>} */}
            {/* <div>{notes.map(note => <div>{note}</div>)}</div> */}
        </>
    );
}
export default Editor;