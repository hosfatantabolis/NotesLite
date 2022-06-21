import './App.css';
import { NotesList } from '../NotesList/NotesList';
import { Search } from '../Search/Search';
import { NotePopup } from '../Popup/NotePopup';
import React from 'react';
import { NEW_NOTE } from '../../utils/constants'

function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState();
  const [popupAction, setPopupAction] = React.useState();

  React.useEffect(() => {
    setSelectedNote(NEW_NOTE);
  }, [])

  function handleNoteClick(note) {
    setPopupAction("");
    setSelectedNote(note);
    setIsOpen(true);
  }

  function handleNewNoteClick() {
    setPopupAction("new")
    setSelectedNote({ ...NEW_NOTE, id: Date.now() });
    setIsOpen(true);
  }

  return (
    <div className="App">
      {/*
      <div style={{ maxWidth: "100%", display: 'flex', margin: "auto", justifyContent: "center" }}>
        <button onClick={() => dispatch(fetchCustomers())}>Добавить клиентов из базы</button>
      </div> */}
      <Search />
      <NotesList handleNoteClick={handleNoteClick} handleNewNoteClick={handleNewNoteClick} />
      <NotePopup note={selectedNote} isOpen={isOpen} setIsOpen={setIsOpen} popupAction={popupAction} />
    </div>
  );
}

export default App;
