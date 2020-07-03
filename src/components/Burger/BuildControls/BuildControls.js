import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './buildControl/buildControl';

const controls = [
{label:'Salad', type:'salad'},
{label:'Bacon', type:'bacon'},
{label:'Cheese', type:'cheese'},
{label:'Meat', type:'meat'}
];

const BuildControls = (props) =>{
	return (
    <div className={styles.BuildControls}>
    <p>Current Price:<strong> ₹ {props.price}</strong></p>
    	{controls.map(ctrl => (
    		<BuildControl 
    		key = {ctrl.label} 
    		label={ctrl.label}
    		morebutton = {() => props.ingredientsAdded(ctrl.type)/*Coming from BurgerBuilder.js property*/}
    		lessbutton = {() => props.ingredientRemoved(ctrl.type)}
    		disabled = {props.disabled[ctrl.type]}
    		/>
    	))}
    <button className={styles.OrderButton} 
    disabled={!props.purchasable /*! because it's by default false
     So it needs to be true to show disabled*/}
    onClick={props.ordernowclicked}>{props.isAuth ? 'ORDER NOW!' : 'LOGIN TO CONTINUE'}</button>
    
   </div>
   );
}
export default BuildControls;
