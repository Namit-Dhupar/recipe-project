import React from 'react';
import styles from './Burger.module.css';
//For those history, match, push etc parameters to be made available to other components, we need
import { withRouter } from 'react-router-dom';
import BurIng from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
  console.log(props);
   //In order for BurgerBuilder.js to use the state object we will need to access it's
   //'ingredients' and it's Key Value Pair, hence we are transforming object of key value to Array
   let transformIngredients = Object.keys(props.ingredients) //Accessing the ingredients prop
   .map(igKey => { //refers to as key of the state object(salad, meat, bacon etc)
       return [...Array(props.ingredients[igKey])].map( (_,i) => { //first argument is blank and 
            	                                           //second arguments is the value of the keys
               return <BurIng key={igKey + i} type = {igKey}/>;
            }); //Here the reduce method is used convert array to single value
                //See Map.js for complete understanding of reduce method
    }).reduce((acc,curr) => {
       return acc.concat(curr);
    },[]);
  if(transformIngredients.length === 0){
    transformIngredients = <p>Please Start Adding ingredients</p>
  }
	return(
    <div className = {styles.Burger}>
    <h1>Burger Builder App with React</h1>
		<BurIng type="bread-top" />
		{transformIngredients}
        <BurIng type="bread-bottom" />
	</div>);
};

export default withRouter(Burger);