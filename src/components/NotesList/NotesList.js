import { Note } from "../Note/Note"
import React from "react";
import { useSelector } from 'react-redux';
import "./NotesList.css";

export const NotesList = ({ handleNoteClick }) => {
    const notes = useSelector(state => state.notes.notes);
    const filteredNotes = useSelector(state => state.notes.filteredNotes);
    const searchQuery = useSelector(state => state.notes.searchQuery);
    React.useEffect(() => {
        localStorage.setItem(
            'notes',
            JSON.stringify(notes)
        );
    }, [notes]);
    return (
        <>
            <div className="notes__list">
                {(filteredNotes.length !== notes.length && searchQuery !== "") && filteredNotes.map(note => {
                    return <Note note={note} key={note.id} handleNoteClick={handleNoteClick} />
                })}
                {(filteredNotes.length === notes.length || searchQuery === "") && notes.map(note => {
                    return <Note note={note} key={note.id} handleNoteClick={handleNoteClick} />
                })}
            </div>
        </>
    )
}