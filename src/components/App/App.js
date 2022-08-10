import './App.css';
import { NotesList } from '../NotesList/NotesList';
import { Search } from '../Search/Search';
import { Popup } from '../Popup/Popup';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NEW_NOTE, NEW_MODE, EDIT_MODE, THEME_DARK } from '../../utils/constants';
import { editSelectedNoteAction } from '../../store/noteReducer';

function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedNote = useSelector(state => state.notes.selectedNote);
  const dispatch = useDispatch();

  const [popupAction, setPopupAction] = React.useState();

  function handleNoteClick(note) {
    setPopupAction(EDIT_MODE);
    dispatch(editSelectedNoteAction(note));
    setIsOpen(true);
  }

  function handleNewNoteClick() {
    const dateTime = new Date();
    const dateNow = `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()} ${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`;
    setPopupAction(NEW_MODE)
    dispatch(editSelectedNoteAction({ ...NEW_NOTE, id: Date.now(), dateCreated: dateNow }));
    setIsOpen(true);
  }
  const theme = useSelector(state => state.theme.theme);

  return (
    <div className={`App ${theme === THEME_DARK ? "App_dark" : ""}`}>
      <Search handleNewNoteClick={handleNewNoteClick} />
      <NotesList handleNoteClick={handleNoteClick} />
      <Popup note={selectedNote} isOpen={isOpen} setIsOpen={setIsOpen} popupAction={popupAction} />
    </div>
  );
}

export default App;
