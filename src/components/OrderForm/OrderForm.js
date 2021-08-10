import React, { useState } from 'react';
import './OrderForm.css';

const OrderForm = ({ addOrder }) => {
  const [ name, setName ] = useState('');
  const [ ingredients, setIngredients ] = useState([]);
  const [ orderError, setError ] = useState('');

  const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
  const ingredientButtons = possibleIngredients.map((ingredient) => {
      return (
          <button
            key={ingredient}
            id={ingredient}
            name={ingredient}
            value={ingredient}
            onClick={(e) => checkIngredients(e)}    
          >
            {ingredient}
          </button>
        );
    });


  const checkIngredients = (e) => {
    e.preventDefault()
    if (!ingredients.includes(e.target.value)) {
      setIngredients([...ingredients, e.target.value])
    } else {
      const filteredIngredients = ingredients.filter(item => {
        return e.target.value !== item
      })
      setIngredients(filteredIngredients)
    }
  }

  const clearInputs = () => {
    setName('');
    setIngredients([]);
    setError('');
  }

  const submitOrder = (e) => {
    e.preventDefault();

    const burritoOrder = {
      name,
      ingredients
    }

    addOrder(burritoOrder)
    clearInputs()
  }
  
  const checkOrder = (e) => {
    e.preventDefault()
    if (ingredients.length === 0) {
    setError('Please add some ingredients to your burrito!');
    alert(orderError)
  } else if (!name) {
    setError('Please enter a name for this order!');
    alert(orderError)
  } else {
    submitOrder(e)
  }
}
    
  return (
      <form className='order-form'>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={e => setName(e.target.value)}
        />

        { ingredientButtons }

        <p className='order-details'>
          Order: {ingredients.join(', ') || 'Nothing selected' }
        </p>

        <button className='submit' onClick={(e) => checkOrder(e)}>
          Submit Order
        </button>
      </form>
    );
  }

export default OrderForm;
