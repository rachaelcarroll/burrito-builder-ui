import React, { useState, useEffect } from 'react';
import './App.css';
import { getOrders, postOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';


const App = () => {
  const [ orders, setOrders ] = useState([]);
  const [ error, setError ] = useState('');


const getAllOrders = async () => {
  setError('');
  try { 
    let data = await getOrders()
    setOrders(data.orders)
  } catch (error) {
    setError(error.message)
  }
}

  useEffect(() => {
    getAllOrders()
  }, [])

  const addOrder = async (burrito) => {
    try {
      setOrders([...orders, burrito])
      await postOrder(burrito)
  } catch (error) {
      setError('We seem to be experiencing technical difficulties and could not place your order, please try again later!')
  }
}

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm 
          addOrder={addOrder}
        />
      </header>
      {error ? <h2 className='error-message'>{error}</h2> :
        <Orders 
        orders={orders}
        />}
    </main>
  );
}
export default App;
