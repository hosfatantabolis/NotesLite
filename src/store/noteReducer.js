const defaultState = {
    notes: [
        {
            id: 1,
            title: "Заголовок заметки",
            text: "Чтобы отредактировать заметку, нажмите на неё",
            color: "#FAD247",
            dateCreated: '1/1/1970 00:00:00',
            type: "text",
            list: []
        },
        {
            id: 2,
            title: "Заголовок заметки 2",
            text: "",
            color: "#A646F0",
            dateCreated: '1/1/1970 00:00:00',
            type: "list",
            list: [{
                id: 1,
                text: "Элемент списка",
                done: false
            }, {
                id: 2,
                text: "Элемент списка 2",
                done: true
            }, {
                id: 3,
                text: "Еще один элемент списка",
                done: false
            }]
        }
    ],
    filteredNotes: [],
    searchQuery: "",
    selectedNote: {}
}

const ADD_NOTE = "ADD_NOTE";
const DELETE_NOTE = "DELETE_NOTE";
const EDIT_NOTE = "EDIT_NOTE";
const EDIT_NOTE_COLOR = "EDIT_NOTE_COLOR";
const SEARCH_NOTES = "SEARCH_NOTES";
const EDIT_SELECTED_NOTE = "EDIT_SELECTED_NOTE";

let notesArr;
localStorage.getItem("notes") ? notesArr = { notes: JSON.parse(localStorage.getItem('notes')), filteredNotes: [], searchQuery: "" } : notesArr = defaultState;

export const noteReducer = (state = notesArr, action) => {
    switch (action.type) {
        case ADD_NOTE: {
            return { ...state, notes: [action.payload, ...state.notes] }
        }
        case EDIT_NOTE:
            return {
                ...state,
                notes: state.notes.map(
                    (note) => note.id === action.payload.note.id ? action.payload.note
                        : note
                )
            }
        case EDIT_NOTE_COLOR:
            return {
                ...state,
                notes: state.notes.map(
                    (note) => note.id === action.payload.note.id ? { ...note, color: action.payload.color }
                        : note
                )
            }
        case SEARCH_NOTES:
            let newState = Object.assign({}, state);
            const { text } = action.payload;
            const filteredNotes = state.notes.filter((note) => { return note.text.toLowerCase().includes(text.toLowerCase()) || note.title.toLowerCase().includes(text.toLowerCase()) || note.list.some((item) => { return item.text.toLowerCase().includes(text.toLowerCase()) }) });
            if (text) {
                newState.notes = filteredNotes;
            }
            return { ...state, filteredNotes: newState.notes, searchQuery: text }
        case DELETE_NOTE: return { ...state, notes: state.notes.filter(note => note.id !== action.payload) }
        case EDIT_SELECTED_NOTE: return { ...state, selectedNote: action.payload }
        default: return state;
    }
};

export const addNoteAction = (payload) => ({ type: ADD_NOTE, payload });
export const deleteNoteAction = (payload) => ({ type: DELETE_NOTE, payload });
export const editNoteAction = (payload) => ({ type: EDIT_NOTE, payload });
export const editNoteColorAction = (payload) => ({ type: EDIT_NOTE_COLOR, payload });
export const searchNoteAction = (payload) => ({ type: SEARCH_NOTES, payload });
export const editSelectedNoteAction = (payload) => ({ type: EDIT_SELECTED_NOTE, payload });

