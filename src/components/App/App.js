import './App.css';
import { NotesList } from '../NotesList/NotesList';
import { Search } from '../Search/Search';
import { Popup } from '../Popup/Popup';
import React from 'react';
import { NEW_NOTE, NEW_MODE, EDIT_MODE } from '../../utils/constants'

function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState();
  const [popupAction, setPopupAction] = React.useState();

  React.useEffect(() => {
    setSelectedNote(NEW_NOTE);
  }, [])

  function handleNoteClick(note) {
    setPopupAction(EDIT_MODE);
    setSelectedNote(note);
    setIsOpen(true);
  }

  function handleNewNoteClick() {
    const dateTime = new Date();
    const dateNow = `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()} ${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`;
    setPopupAction(NEW_MODE)
    setSelectedNote({ ...NEW_NOTE, id: Date.now(), dateCreated: dateNow });
    setIsOpen(true);
  }

  return (
    <div className="App App_dark">
      {/*
      <div style={{ maxWidth: "100%", display: 'flex', margin: "auto", justifyContent: "center" }}>
        <button onClick={() => dispatch(fetchCustomers())}>Добавить клиентов из базы</button>
      </div> */}
      <Search handleNewNoteClick={handleNewNoteClick} />
      <NotesList handleNoteClick={handleNoteClick} />
      <Popup note={selectedNote} isOpen={isOpen} setIsOpen={setIsOpen} popupAction={popupAction} />
    </div>
  );
}

export default App;
