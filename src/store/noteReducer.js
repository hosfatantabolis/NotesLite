const defaultState = {
    notes: [
        {
            id: 1,
            title: "Note title",
            text: "some text"
        },
        // { id: 2, title: "Hello2", text: "some other text" }
    ]
}

const ADD_NOTE = "ADD_NOTE";
const DELETE_NOTE = "DELETE_NOTE";
const EDIT_NOTE = "EDIT_NOTE";

// const ADD_MANY_CUSTOMERS = "ADD_MANY_CUSTOMERS";
// const REMOVE_CUSTOMER = "REMOVE_CUSTOMER";
let notesArr;
localStorage.getItem("notes") ? notesArr = { "notes": JSON.parse(localStorage.getItem('notes')) } : notesArr = defaultState;

export const noteReducer = (state = notesArr, action) => {
    switch (action.type) {
        case ADD_NOTE: return { ...state, notes: [...state.notes, action.payload] }
        //   case ADD_MANY_CUSTOMERS: return {...state, customers: [...state.customers, ...action.payload]}
        case DELETE_NOTE: return { ...state, notes: state.notes.filter(note => note.id !== action.payload) }
        default: return state;
    }
};

export const addNoteAction = (payload) => ({ type: ADD_NOTE, payload });
// export const addManyCustomersAction = (payload) => ({type: ADD_MANY_CUSTOMERS, payload});
export const deleteNoteAction = (payload) => ({ type: DELETE_NOTE, payload });