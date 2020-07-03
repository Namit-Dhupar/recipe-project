import React, { Component } from 'react';
import Styles from './ContactData.module.css';
import Button from '../../components/UI/CustomButton/CustomButton';
import { connect } from 'react-redux'; //used to connect the actions and reducers from the store
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions/index';

/**************FORMS IN REACTS JS PART 2*******************/
class ContactData extends Component{
    state = {
      orderForm: {
          //Defining the properties of each attribute
         name: {
           elementType: 'input',
           elementConfig: {
             type: 'text',
             placeholder: 'Your Name'
            },
            value:''
           },

         street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Street'
           },
           value: ''
          },

         zip: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Pin Code'
           },
           value: ''
          },

         country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Country'
           },
           value: ''
          },

         email: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your E-Mail'
           },
           value: ''
          },

         deliveryoptions: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'}
             ]
            },
            value: 'fastest'
          },
        },
     loading: false
    }

    orderHandler = (event) =>{
       event.preventDefault(); //To prevent Default behaviour of form refresh
       const formData = {};
       for(let key in this.state.orderForm){ //Mapping to formData Object
         formData[key] = this.state.orderForm[key].value; //key value pairs
       }
    //   this.setState({loading: true});
       const order = { //JSON Data to firebase on post
         ingredients: this.props.ingr,
         price: this.props.price,
         orderData: formData,
         userID: this.props.userId
       }
       /****USED IN store/action/orders.js as an async code***BEFORE REDUX*/
      //  axios.post('/orders.json', order)//.json is the endpoint for firebase
      //  .then(response =>{
      //    console.log(response);
      //    this.setState({loading: false});
      //    this.props.history.push('/');
      //  }).catch(error =>{
      //    this.setState({loading: false});
      //  });
       /******AFTER REDUX: */
       this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = (event, inputIdentifier) =>{
      const UpdatedControl = {...this.state.orderForm}; //clones properties such as name, email, street etc
      const UpdatedFormState = {...UpdatedControl[inputIdentifier]}; //cloned properties like elementType, elementConfig, Value
      UpdatedFormState.value = event.target.value; //Accessing the Value Property
      UpdatedControl[inputIdentifier] = UpdatedFormState;
      this.setState({orderForm: UpdatedControl});
    }

    render(){
      const formElementsArray = [];
      //Converting JSON to Javascript array
      for(let key in this.state.orderForm){ 
        formElementsArray.push({
          id: key, //name, street, email etc
          setup: this.state.orderForm[key]//elementType, elementConfig, value 
        });
      }
      let form = (
        <form onSubmit={this.orderHandler}>
         {formElementsArray.map(formElementArray=>( //mapping entire array onto individual elements
          <Input
           key={formElementArray.id}
           elementType={formElementArray.setup.elementType}
           elementConfig={formElementArray.setup.elementConfig} 
           value={formElementArray.setup.value}
           changed={(event)=>this.inputChangedHandler(event, formElementArray.id)} />
        ))}
        <Button btntype='Success'>ORDER NOW!</Button>
    </form>  
      );
      if(this.props.loading){
        form = <Spinner />;
      }
        return(
            <div className={Styles.ContactData}>
            <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
  return{ //As ingredients and TotalPrice Belongs to the burgerBuilder Reducer files but the loading comes from orders reducers
    ingr: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.TotalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userID
  };
};

const mapDispatchToProps = dispatch => {
  return{ 
    onOrderBurger: (orderData, token) => dispatch(actions.purchasBurger(orderData, token))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ContactData, axios)); //Used in Checkout.js