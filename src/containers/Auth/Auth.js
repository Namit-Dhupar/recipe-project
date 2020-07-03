import React,{ Component } from 'react';
import Input from '../../components/UI/Input/Input';
import { Redirect } from 'react-router-dom';
import Button from '../../components/UI/CustomButton/CustomButton';
import Spinner from '../../components/UI/Spinner/Spinner';
import Styles from './Auth.module.css';
import { connect } from 'react-redux'; //used to connect the actions and reducers from the store
import * as actions from '../../store/actions/index';
class Auth extends Component{
//Same as ContactData.js
    state = {
       controls: {
        email: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Your E-Mail'
             },
             value: ''
            },
        password: {
            elementType: 'input',
            elementConfig: {
              type: 'password',
              placeholder: 'Your Password'
             },
             value:''
            }    
       },
       isSignUp: true //Website should always be in sign up mode initially
    }
/*************FOR ENABLING INPUT IN INPUT BOX***********/
      inputChangedHandler = (event, inputIdentifier) =>{
      const UpdatedControl = {...this.state.controls}; //clones properties such as name, email, street etc
      const UpdatedFormState = {...UpdatedControl[inputIdentifier]}; //cloned properties like elementType, elementConfig, Value
      UpdatedFormState.value = event.target.value; //Accessing the Value Property
      UpdatedControl[inputIdentifier] = UpdatedFormState;
      this.setState({controls: UpdatedControl});
    }
  /******************************************************/
  /***********TO SWITCH BETWEEN LOGIN MODES**************/
    SwitchAuthHandler = () => {
      this.setState(prevState =>{
        return {isSignUp: !prevState.isSignUp};
      })
    }
  /******************************************************/
    SignUpHandler = (event) =>{
      event.preventDefault(); //To prevent Default behaviour of form refresh
      this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
       };
   render() {
    const formElementsArray = [];
    //Converting JSON to Javascript array
    for(let key in this.state.controls){ 
      formElementsArray.push({
        id: key, //name, street, email etc
        setup: this.state.controls[key]//elementType, elementConfig, value 
      });
    }
    let form = formElementsArray.map(formElementArray =>(
        <Input
        key={formElementArray.id}
           elementType={formElementArray.setup.elementType}
           elementConfig={formElementArray.setup.elementConfig} 
           value={formElementArray.setup.value}
           changed={(event)=>this.inputChangedHandler(event, formElementArray.id)}
        />
    ));
    if(this.props.loading)
    form = <Spinner />

    let errorMessage = null;
    if(this.props.error){
    errorMessage = (
      <p>{this.props.error.message}</p>
      );
    }
    /***********REDIRECT BACK TO HOMEPAGE ONCE AUTHENTICATED**************/
    let authenticRedirect = null;
    if(this.props.isAuthenticated){
      authenticRedirect = <Redirect to='/'/>
    }
       return(
        <div className={Styles.Auth}>
        {authenticRedirect}
        {errorMessage}
        <h4>Customer Registration Form</h4>
            <form onSubmit = {this.SignUpHandler}>
            {form}
            <Button btntype='Success'>SUBMIT!</Button>
            </form>
            <Button 
            clicked = {this.SwitchAuthHandler}
            btntype='Danger'>{this.state.isSignUp ? 'ACCOUNT EXISTS? SIGN IN' : 'SIGN UP'}</Button>
        </div>
       );
   }
}

const mapStateToProps = state => {
  return{
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated : state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return{
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);