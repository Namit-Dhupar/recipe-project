import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import ContactData from '../../containers/ContactData/ContactData';
import { connect } from 'react-redux'; //used to connect the actions and reducers from the store
class Checkout extends Component{
    //CheckoutSummary Having it's props as ingredients
    //Shall be replaced through routing
    /*****************ALREADY HANDLED IN REDUX STORE **************/
    // state = {
    //     ingredients : null,
    //     TotalPrice: 0
    // }

    // componentWillMount() { //DidMount = After render(), WillMount = Before render() 
    //     const query = new URLSearchParams(this.props.location.search); //Targets the URL String, which is present in the location.search in the console log
    //     const checkoutIngredients = {};
    //     let checkoutprice = 0;
    //     for (let result of query.entries()){ //'of' is used to loop over the strings of an array/string
    //    // console.log('Result of join is ' + result.join(' '));
    //     if(result[0] === 'price'){
    //         checkoutprice = +result[1];
    //     }else{
    //     checkoutIngredients[result[0]] = +result[1]; //result[0]=Key, result[1]=Value, +result[1] means we are converting string to number
    //       }
    //     }
    //     this.setState({ingredients:  checkoutIngredients, TotalPrice: checkoutprice});
    // }

    CheckoutcancelHandler = () =>{
        this.props.history.goBack();
       }

       CheckoutcontinueHandler = () =>{
        this.props.history.replace('/checkout/contact-form');
       }
    render(){
        let summary = <Spinner />
        //If purchased is true then redirect otherwise dont
        const purchaseRedirect = this.props.purchase ? <Redirect to='/'/> : null
        if(this.props.ingr){
            summary  = (
                <div>
                {purchaseRedirect}
                    <CheckoutSummary ingredientos=/*BEFORE REDUX:{this.state.ingredients} AFTER REDUX:*/ {this.props.ingr}
                        Checkoutcancel={this.CheckoutcancelHandler}
                        Checkoutcontinue={this.CheckoutcontinueHandler}
                       />
                    <Route path={this.props.match.path + '/contact-form'} 
                        /*render={() => (<ContactData ingredients={this.props.ingr} price={this.props.price}/>)}*/
                        //After Redux:
                        component = {ContactData}
                    />
                </div>
              );
        }
       
        return summary;
    }
}
const mapStateToProps = state => {
    return{ //As ingredients and TotalPrice Belongs to the burgerBuilder Reducer files and purchased with orderReducer
      ingr: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.TotalPrice,
      purchase: state.order.purchased //Action handled in BurgerBuilder.js
    };
 }
 
export default connect(mapStateToProps, null)(Checkout);