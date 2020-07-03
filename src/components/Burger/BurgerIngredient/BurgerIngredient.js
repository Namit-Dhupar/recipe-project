import React, { Component } from 'react';
import styles from './BurgerIngredient.module.css'; //imports css module
import PropTypes from 'prop-types'; //To validate the prop.type used

class BurgerIngredient extends Component {
  
  render(){
   let ingredient = null; //By default burger shouldn't have any ingredient
    
    //now using the switch cases for adding ingredient in the burger
    switch(this.props.type){
    	case('bread-bottom'):
    	   ingredient = <div className={styles.BreadBottom}></div>
    	   break;
    	//Bread top also involves seeds so we will use nested divs here   
    	case('bread-top'):
    	   ingredient =(
            <div className={styles.BreadTop}>
    	   	<div className={styles.Seeds1}></div>
    	   	<div className={styles.Seeds1}></div>
    	   </div>
           );
    	   break;
    	case('meat'):
    	   ingredient = <div className={styles.Meat}></div>
    	   break;
    	case('cheese'):
    	   ingredient = <div className={styles.Cheese}></div>
    	   break; 
    	case('salad'):
    	   ingredient = <div className={styles.Salad}></div>
    	   break;
    	case('bacon'):
    	   ingredient = <div className={styles.Bacon}></div>
    	   break;
    	default:
    	   ingredient = null;
   }
   return ingredient;
  }
}

//Using the prop types validation
BurgerIngredient.propTypes = {
   type: PropTypes.string.isRequired
};

export default BurgerIngredient;