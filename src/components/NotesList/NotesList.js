import { Note } from "../Note/Note"
import React from "react";
import { useSelector } from 'react-redux';
import "./NotesList.css";

export const NotesList = ({ handleNoteClick }) => {
    const notes = useSelector(state => state.notes.notes);
    // const filteredNotes = useSelector(state => state.notes.filteredNotes);
    const searchQuery = useSelector(state => state.notes.searchQuery);
    React.useEffect(() => {
        localStorage.setItem(
            'notes',
            JSON.stringify(notes)
        );
    }, [notes]);
    return (
        <div className="notes__list_wrapper">
            {(searchQuery === "" && notes.length !== 0) &&
                <div className="notes__section">
                    <h2 className="notes__list_title">Закреплённые</h2>
                    <div className="notes__list notes__list_pinned">
                        {notes.map(note => {
                            return note.pinned && <Note note={note} key={note.id} handleNoteClick={handleNoteClick} />
                        })}
                    </div>
                </div>}
            {notes.length !== 0 && <div className="notes__section">
                <h2 className="notes__list_title">Другие заметки</h2>
                <div className="notes__list">
                    {(searchQuery === "") && notes.map(note => {
                        return !note.pinned && <Note note={note} key={note.id} handleNoteClick={handleNoteClick} />
                    }
                    )}

                    {(searchQuery !== "") && notes.filter((note) => {
                        return note.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            note.list.some((item) => {
                                return item.text.toLowerCase().includes(searchQuery.toLowerCase())
                            })
                    })
                        .map((note) => {
                            return <Note note={note} key={note.id} handleNoteClick={handleNoteClick} />
                        })}
                </div>
            </div>}
            {notes.length === 0 && <p>Нет заметок. Чтобы создать новую заметку, нажмите на кнопку справа от строки поиска</p>}
        </div>
    )
}