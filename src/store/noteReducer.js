const defaultState = {
    notes: [
        {
            id: 1,
            title: "Note title",
            text: "some text",
            color: "#FAD247"
        },
        {
            id: 2,
            title: "Hello2",
            text: "some other text",
            color: "#A646F0"
        }
    ]
}

const ADD_NOTE = "ADD_NOTE";
const DELETE_NOTE = "DELETE_NOTE";
const EDIT_NOTE = "EDIT_NOTE";
const EDIT_NOTE_COLOR = "EDIT_NOTE_COLOR";

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
