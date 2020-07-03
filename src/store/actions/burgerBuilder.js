//This file will be used as Burger Builder Action Creators
import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

//To be used as the replacement in the mapDispatchToProps() in the main burgerBuilder.js to make the code modular
export const addIngredient = (ingname) =>{
  return{
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: ingname
  };
};

export const removeIngredient = (ingname) =>{
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingname
    };
  };
  
export const setIngredients = (ingredients) =>{
   return{
       type: actionTypes.SET_INGREDIENT,
       ingredients: ingredients
   };
};

  //An Async function to obtain orders from firebase
export const initIngredients = () =>{
    return dispatch =>{  //Used for Async code and is possible through middleware thunk in index.js
      axios.get('https://reavt-burger-app.firebaseio.com/ingredients.json')
     .then(response =>{
      dispatch(setIngredients(response.data));
     });
    };
};  