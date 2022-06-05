import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomerAction, removeCustomerAction } from '../../store/customerReducer';
import { addCashAction, removeCashAction } from '../../store/cashReducer';
import { fetchCustomers } from '../../asyncActions/customers';
import Editor from '../Editor/Editor';

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
  return (
    <div className="App">
      <Editor />
      <div style={{ fontSize: '50px' }}>{cash}</div>
      <div style={{ maxWidth: "100%", display: 'flex', margin: "auto", justifyContent: "center" }}>
        <button onClick={() => addCash()}>Пополнить</button>
        <button onClick={() => removeCash()}>Снять</button>
        <button onClick={() => addClient(prompt())}>Добавить клиента</button>
        <button onClick={() => dispatch(fetchCustomers())}>Добавить клиентов из базы</button>
        {/* <button onClick={()=>removeClient()}>Удалить клиента</button> */}
      </div>
      {customers.length > 0 ?
        <div style={{ maxWidth: "50%" }}>
          {customers.map(customer =>
            <div onClick={() => removeClient(customer)} style={{ fontSize: "1.5rem", border: "1px solid" }} key={customer.id}>{customer.name}</div>)}
          {/* {customers} */}
        </div> :
        <div style={{ fontSize: '50px' }}>Нету клиентов</div>}
    </div>
  );
}

export default App;
