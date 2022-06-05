const defaultState = {
    notes: []
}

const ADD_NOTE = "ADD_NOTE";
// const ADD_MANY_CUSTOMERS = "ADD_MANY_CUSTOMERS";
// const REMOVE_CUSTOMER = "REMOVE_CUSTOMER";

export const noteReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_NOTE: return { ...state, notes: [...state.notes, action.payload] }
        //   case ADD_MANY_CUSTOMERS: return {...state, customers: [...state.customers, ...action.payload]}
        //   case REMOVE_CUSTOMER: return {...state, customers: state.customers.filter(customer => customer.id !== action.payload)}
        default: return state;
    }
};

export const addNoteAction = (payload) => ({ type: ADD_NOTE, payload });
// export const addManyCustomersAction = (payload) => ({type: ADD_MANY_CUSTOMERS, payload});
// export const removeCustomerAction = (payload) => ({type: REMOVE_CUSTOMER, payload});