import { Note } from "../Note/Note"
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addNoteAction } from '../../store/noteReducer';

export const NotesList = () => {
    // const dispatch = useDispatch();
    const notes = useSelector(state => state.notes.notes);
    return (
        <div className="notes__list">
            {notes.map(note => {
                return <Note note={note} key={note.id} />
            })}
        </div>

    )
}