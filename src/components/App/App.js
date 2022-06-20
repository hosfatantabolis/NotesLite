import './App.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCustomers } from '../../asyncActions/customers';
import { NotesList } from '../NotesList/NotesList';
import { Search } from '../Search/Search';
import { NotePopup } from '../Popup/NotePopup';
import React from 'react';
// import { addNoteAction } from '../../store/noteReducer';

function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState();
  function handleNoteClick(note) {
    // setIsPopupOpen(true);
    setSelectedNote(note);
    setIsOpen(true);
  }
  // const dispatch = useDispatch();
  // const customers = useSelector(state => state.customers.customers);
  // const addNote = (note) => {
  //   dispatch(addNoteAction(note))
  // }
  return (
    <div className="App">
      {/*
      <div style={{ maxWidth: "100%", display: 'flex', margin: "auto", justifyContent: "center" }}>
        <button onClick={() => dispatch(fetchCustomers())}>Добавить клиентов из базы</button>
      </div> */}
      <Search />
      <NotesList handleNoteClick={handleNoteClick} />
      <NotePopup note={selectedNote} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default App;
