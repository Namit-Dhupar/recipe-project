import React from 'react';
import Hoc from '../../../hoc/hoc';
import CustomButton from '../../UI/CustomButton/CustomButton';

const OrderSummary = (props) =>{
  const ingredientSummary = Object.keys(props.ingredients)//Getting the ingredient object from Burger Builder
  .map( igKey=> { //Proper Demonstration on what the hell it actual it actually does
  	return <li key={igKey}> 
  	<span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
  	</li>
  });
	
	return( 
	<Hoc>
		<h3>Your Order:</h3>
		<p>A delicious burger with the following Ingredients:</p>
		<ul>{ingredientSummary}</ul>
		<p><strong>Total Price:</strong>₹ {props.price}</p>
		<p>Continue to Checkout?</p>
		<CustomButton btntype='Danger' clicked={props.purchaseCancelHandle}>CANCEL</CustomButton>
		<CustomButton btntype='Success'clicked={props.purchaseContinueHandle}>CONTINUE</CustomButton>
	</Hoc>
  )
};

export default OrderSummary;