import { Note } from "../Note/Note"
import React from "react";
import { useSelector } from 'react-redux';
import "./NotesList.css";

export const NotesList = ({ handleNoteClick, handleNewNoteClick }) => {
    const notes = useSelector(state => state.notes.notes);

    return (
        <>

            <div className="note__list">
                <button className="note__list_new-note" onClick={() => { handleNewNoteClick() }}></button>
                {notes.map(note => {
                    return <Note note={note} key={note.id} handleNoteClick={handleNoteClick} />
                })}
            </div>
        </>
    )
}