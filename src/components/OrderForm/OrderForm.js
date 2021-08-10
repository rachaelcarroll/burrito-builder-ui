import React, { useState } from 'react';
import './OrderForm.css';

const OrderForm = ({ addOrder }) => {
  const [ name, setName ] = useState('');
  const [ ingredients, setIngredients ] = useState([]);
  const [ orderError, setError ] = useState('');

  const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
  const ingredientButtons = possibleIngredients.map((ingredient, i) => {
      return (
          <button
            key={i}
            id={i}
            name={ingredient}
            value={ingredient}
            onClick={(ingredient) => checkIngredients(ingredient)}    
          >
            {ingredient}
          </button>
        );
    });


  const checkIngredients = (ingredient) => {
    if (!ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient])
    } else {
      const filteredIngredients = ingredients.filter(item => {
        return ingredient !== item
      })
      setIngredients(filteredIngredients)
    }
  }

  clearInputs = () => {
    setName('');
    setIngredients([]);
    setError('');
  }

  const submitOrder = (e) => {
    e.preventDefault();

    const burritoOrder = {
      name: name,
      ingredients: ingredients
    }

    if (ingredients.length === 0) {
      setError('Please add some ingredients to your burrito!');
      alert(error)
    } else if (!name) {
      setError('Please enter a name for this order!')
      alert(error)
    } else {
      addOrder(burritoOrder)
      clearInputs()
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

        <button onClick={(e) => submitOrder(e)}>
          Submit Order
        </button>
      </form>
    );
  }

export default OrderForm;
