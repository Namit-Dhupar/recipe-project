//Structutre of a reducer is always used like this
//Reducers will then Got to actions(I used same name for reference)
import * as actionTypes from '../actions/actionTypes';

const initState = {
    // ingredients: { //Code in the ComponentDidMount in burgerbuilder.js is commented because Redux can't handle asynchronous code by default
    //     salad: 0,
    //     bacon: 0,
    //     cheese: 0,
    //     meat: 0
    // },
    //Now by handling redux's async code
    ingredients: null,
    TotalPrice:40
};

const INGEDIENT_PRICES = { //Price of the ingredients in Rupees
  salad: 5,
  cheese: 15,
  meat: 25,
  bacon: 30
}

const reducer = (state = initState, action) => {
  //Should work as addIngredientHandler & removeIngredientHandler in redux
  switch (action.type) {
    //Break not needed due to return statements
    case actionTypes.ADD_INGREDIENT:
          return{
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1 //Key Value Pair
            },
            TotalPrice: state.TotalPrice + INGEDIENT_PRICES[action.ingredientName]
          };
      case actionTypes.REMOVE_INGREDIENT: 
          return{
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            },
            TotalPrice: state.TotalPrice - INGEDIENT_PRICES[action.ingredientName]
          };
      case actionTypes.SET_INGREDIENT:
          return{
            ...state,
            ingredients: action.ingredients,
            TotalPrice: 40
          }   
      default: 
         return state;        
  }
};

export default reducer;