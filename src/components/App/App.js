import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomerAction, removeCustomerAction } from '../../store/customerReducer';
import { addCashAction, removeCashAction } from '../../store/cashReducer';
import { fetchCustomers } from '../../asyncActions/customers';
import { NotesList } from '../NotesList/NotesList';
// import { addNoteAction } from '../../store/noteReducer';

function App() {
  const dispatch = useDispatch();
  const cash = useSelector(state => state.cash.cash);
  const customers = useSelector(state => state.customers.customers);
  console.log(cash);
  const addCash = () => {
    dispatch(addCashAction(1));
  };
  const removeCash = () => {
    dispatch(removeCashAction(1));
  };
  const addClient = (name) => {
    const customer = {
      name,
      id: Date.now(),
    }
    dispatch(addCustomerAction(customer));
  };
  const removeClient = (customer) => {
    dispatch(removeCustomerAction(customer.id));
  };
  // const addNote = (note) => {
  //   dispatch(addNoteAction(note))
  // }
  return (
    <div className="App">
      {/* <div style={{ fontSize: '50px', marginTop: '20px' }}>{cash}</div>
      <div style={{ maxWidth: "100%", display: 'flex', margin: "auto", justifyContent: "center" }}>
        <button onClick={() => addCash()}>Пополнить</button>
        <button onClick={() => removeCash()}>Снять</button>
        <button onClick={() => addClient(prompt())}>Добавить клиента</button>
        <button onClick={() => dispatch(fetchCustomers())}>Добавить клиентов из базы</button>
      </div>
      {customers.length > 0 ?
        <div style={{ maxWidth: "50%" }}>
          {customers.map(customer =>
            <div onClick={() => removeClient(customer)} style={{ fontSize: "1.5rem", border: "1px solid" }} key={customer.id}>{customer.name}</div>)}
        </div> :
        <div style={{ fontSize: '50px' }}>Нету клиентов</div>} */}
      <NotesList />
    </div>
  );
}

export default App;
