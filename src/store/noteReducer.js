const defaultState = {
    notes: [
        {
            id: 1,
            title: "Заголовок заметки",
            text: "Чтобы отредактировать заметку, нажмите на неё",
            color: "#FAD247"
        },
        {
            id: 2,
            title: "Заголовок заметки 2",
            text: "Еще больше текста",
            color: "#A646F0"
        }
    ],
    filteredNotes: [],
    searchQuery: ""
}

const ADD_NOTE = "ADD_NOTE";
const DELETE_NOTE = "DELETE_NOTE";
const EDIT_NOTE = "EDIT_NOTE";
const EDIT_NOTE_COLOR = "EDIT_NOTE_COLOR";
const SEARCH_NOTES = "SEARCH_NOTES";

let notesArr;
localStorage.getItem("notes") ? notesArr = { "notes": JSON.parse(localStorage.getItem('notes')) } : notesArr = defaultState;

export const noteReducer = (state = notesArr, action) => {
    switch (action.type) {
        case ADD_NOTE: return { ...state, notes: [...state.notes, action.payload] }
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
            const filteredNotes = state.notes.filter((note) => { return note.text.toLowerCase().includes(text) || note.title.toLowerCase().includes(text) });
            if (text) {
                newState.notes = filteredNotes;
            }
            return { ...state, filteredNotes: newState.notes, searchQuery: text }
        //   case ADD_MANY_CUSTOMERS: return {...state, customers: [...state.customers, ...action.payload]}
        case DELETE_NOTE: return { ...state, notes: state.notes.filter(note => note.id !== action.payload) }
        default: return state;
    }
};

export const addNoteAction = (payload) => ({ type: ADD_NOTE, payload });
// export const addManyCustomersAction = (payload) => ({type: ADD_MANY_CUSTOMERS, payload});
export const deleteNoteAction = (payload) => ({ type: DELETE_NOTE, payload });
export const editNoteAction = (payload) => ({ type: EDIT_NOTE, payload });
export const editNoteColorAction = (payload) => ({ type: EDIT_NOTE_COLOR, payload });
export const searchNoteAction = (payload) => ({ type: SEARCH_NOTES, payload });

