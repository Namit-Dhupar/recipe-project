import React from 'react';
import Styles from './Order.module.css';

const Order = (props) =>{
   /*************************************************AN ALTERNATIVE TO TRANSFORM INGREDIENTS FROM BURGER.JS************************* */
    const ingredients = [];

    for(let ingredientName in props.ingredients){
        ingredients.push({ //Making a custon json array which returns keys as Name and amount
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }
  const ingredientOutput = ingredients.map(ig=>{
      return <span
      style={{textTransform: 'capitalize',
      display: 'inline-block',
      margin: '0 8px',
      border: '1px solid #ccc',
      padding: '5px'}} key={ig.name}>{ig.name} ({ig.amount})</span>;
  })
    return(
        <div className={Styles.Order}>
            <p>Ingredients:{ingredientOutput}</p>
            <p>Price: <strong>{props.price} </strong></p>
        </div>
    )
}

export default Order;