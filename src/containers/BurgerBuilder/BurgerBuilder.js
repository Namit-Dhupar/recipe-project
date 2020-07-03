import React, { Component } from 'react';
import Hoc from '../../hoc/hoc';
import Burger from '../../components/Burger/Burger';
import { connect } from 'react-redux'; //used to connect the actions and reducers from the store
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
//import axios from '../../axios-orders'; Now to be used in Store/action/burgerBuilder.js
import Spinner from '../../components/UI/Spinner/Spinner';
//import * as actionTypes from '../../store/actions/actionTypes Now as (below)'
import * as burgerBuilderActions from '../../store/actions/index';
//All the statefull stuff in the container must be handled by the class based components


class BurgerBuilder extends Component {
	state = {  
		//Creating an "ingredients" object
  	/*ingredients: { //Key Value Pairs
  		salad: 0,
  		bacon: 0,
  		cheese: 0,
      meat: 0
  	},*/
    //ingredient derived from reducer.js
    //TotalPrice:40,
    //purchasable: false,
    purchasingMode: false, //For showing summary modal
    loading: false
  }
 
 /************GET REQUEST*************/
  componentDidMount(){//Best Life Cycle for Getting data from the database
    console.log(this.props);
    this.props.onInitIngredient();
    /****This now exists in Store/action/burgerBuilder.js as an async redux funtion*******/
    //  axios.get('https://reavt-burger-app.firebaseio.com/ingredients.json')
    //  .then(response =>{
    //   this.setState({ingredients: response.data});
    //  });
  }
  updatePurchaseState(ingredients) { 
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]; //returns the ingredient object as an array of strings(['salad','bacon','cheese'])
    }).reduce((sum,el) =>{
      return sum + el;
    },0); //Finding the sum of all the values of the ingredients objects
  return sum>0; //Will return a boolean value
  }

/*******************JOB DONE IN REDUCER NOW************************/
//   addIngredientHandler = (type) =>{
//     const oldCount = this.props.ingr[type];
//     const updatedCount = oldCount+1;
//     const updatedIngredients = { //As update in the state must not be made in the original state
//        ...this.props.ingr
//     };
//     updatedIngredients[type] = updatedCount;
//     const priceAddition = INGEDIENT_PRICES[type]; //As it's using same keys
//     const oldPrice = this.state.TotalPrice;
//     const updatedPrice = oldPrice + priceAddition;
//     this.setState({TotalPrice: updatedPrice, ingredients: updatedIngredients});
//     this.updatePurchaseState(updatedIngredients); //Show affect as soon as the new ingredients are added
//   }

//   removeIngredientHandler = (type) =>{
//     const oldCount = this.props.ingr[type];
//     if(oldCount <= 0 ){
//       //console.log(oldCount);
//       return;
//     }
//     else{
//     const updatedCount = oldCount-1;
//     const updatedIngredients = { //As update in the state must not be made in the original state
//        ...this.props.ingr
//     };
//     updatedIngredients[type] = updatedCount;
//     const priceDeduction = INGEDIENT_PRICES[type]; //As it's using same keys
//     const oldPrice = this.state.TotalPrice;
//     const updatedPrice = oldPrice - priceDeduction;
//     this.setState({TotalPrice: updatedPrice, ingredients: updatedIngredients});
//     this.updatePurchaseState(updatedIngredients);
//   }
// }

 purchaseHandler = () =>{
   if (this.props.isAuthenticated){
    this.setState({purchasingMode: true});
   }
   else{
    this.props.history.push('/auth');
   }
     
  }

 purchaseCancel = () =>{
    this.setState({purchasingMode: false});
 }

/************POST REQUEST*************/
 purchaseContinue = () =>{
  //alert("Order Made Successfully");
 
  //Route here by pushing on the top of the stack of other pages
  /******************** ENCODE THE ORDERS IN THE URL *******************/
  /* BEFPOR REDUX:
  const queryParams = [];
  for (let i in this.props.ingr){ //in is used to loop over the indexes and of is used to loop over javascript objects
    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingr[i]));
    
  // queryParams.push('price=' + encodeURIComponent(this.props.price));
  // const queryString = queryParams.join('&');
  //  this.props.history.push({
  //    pathname: '/checkout',
  //    search: '?' + queryString}); //Check console log to analyse the path used
 }
 AFTER REDUX: as we can get the ingredients from the redux store */
 this.props.history.push('/checkout'); //Check console log to analyse the path used
 this.props.onInitPurchase();
}


	render(){
    //Props are used to propogate a property defined by component throughout the app
    const disabledInfo = /*BEFORE: {...this.state.ingredients}; AFTER REDUX:*/ {...this.props.ingr}  //To disable if no more ingredients can be less
    for(let key in disabledInfo){
      if(disabledInfo[key]<=0)
        disabledInfo[key] = true;
      else
        disabledInfo[key] = false;
    }

     //Load the ordersummary page only when ingredients are successfully 'get' from backend
    let ordersummary = null;
    //To Show a spinner while the Post request Goes to server backend
    if(this.props.ingr){//If ingredients are now true(successfull get from backend)
    ordersummary = <OrderSummary 
           ingredients={this.props.ingr} 
           purchaseCancelHandle={this.purchaseCancel}
           purchaseContinueHandle={this.purchaseContinue}
           price=/*BEFORE REDUX:{this.state.TotalPrice} AFTER REDUX:*/ {this.props.price}/>;
    if(this.state.loading){
      ordersummary = <Spinner />
     }
    }


    //Load the burger page only when ingredients are successfully 'get' from backend
    let burger = <Spinner /> //Default
    if(this.props.ingr){ //If ingredients are now true(successfull get from backend)
    burger = (
         <Hoc>
         <Burger ingredients = {this.props.ingr /*to fiddle with ingredients state in Burger.js*/} />
         <BuildControls 
         ingredientsAdded=/*BEFORE REDUX:{this.addIngredientHandler} AFTER REDUX:*/ {this.props.onIngredientAdded}
         ingredientRemoved={this.props.onIngredientRemoved}
         isAuth={this.props.isAuthenticated}
         disabled = {disabledInfo}
         price = /*BEFORE REDUX:{this.state.TotalPrice} AFTER REDUX:*/ {this.props.price}
         purchasable = /*BEFORE REDUX:{this.state.purchasable} AFTER REDUX:*/ {this.updatePurchaseState(this.props.ingr)}
         ordernowclicked = {this.purchaseHandler}
         />
         </Hoc>
         );
      }  


		return (
         <Hoc>
         <Modal show={this.state.purchasingMode /*Will Animate In and out of screen*/}
          Modalclosed={this.purchaseCancel}>
           {ordersummary}
         </Modal>
         {burger}
     </Hoc>
	  );
	}
}

const mapStateToProps = state => {
   return{ //As ingredients and TotalPrice Belongs to the burgerBuilder Reducer files
     ingr: state.burgerBuilder.ingredients,
     price: state.burgerBuilder.TotalPrice,
     isAuthenticated : state.auth.token !== null
   };
}
const mapDispatchToProps = dispatch =>{

  /* BEFORE ADDING ActionCreator as action/burgerBuilder.js
  return{
     onIngredientAdded: (ingname) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingname}),
     onIngredientRemoved: (ingname) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingname})
  }; */

  return{
    onIngredientAdded: (ingname) => dispatch(burgerBuilderActions.addIngredient(ingname)),
    onIngredientRemoved: (ingname) => dispatch(burgerBuilderActions.removeIngredient(ingname)),
    onInitIngredient: () => dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()) //Logic in checkout.js as in sets the 'purchased'
    //state as false and the unecessary redirection issue is resolved 
 }; 

}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);