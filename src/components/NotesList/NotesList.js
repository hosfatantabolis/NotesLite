import { Note } from "../Note/Note"
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addNoteAction } from '../../store/noteReducer';
import "./NotesList.css";

export const NotesList = () => {
    const newNote = {
        id: Date.now(),
        title: "New Note",
        text: "some other text",
        color: "#ffffff"
    };
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.notes);
    const addNote = (note) => {
        dispatch(addNoteAction(note));
    }
    return (
        <>

            <div className="note__list">
                {/* <button onClick={() => { console.log('1') }}>New note</button> */}
                <button onClick={() => { addNote(newNote) }} note={newNote}> New Note </button>
                {notes.map(note => {
                    return <Note note={note} key={note.id} />
                })}
            </div>
        </>
    )
}