import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index'
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Logout from './containers/Auth/Logout/Logout'
import Auth from './containers/Auth/Auth';

class App extends Component {
   componentDidMount(){ ///On reload the user won't get logged out
     this.props.onTryAutoSignup();
  }

  render(){
    /*********Making the routes more secure********/
    let routes = ( 
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to = '/' />
      </Switch>
    );
    if (this.props.isAuthenticated){
      routes = (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to = '/' />
      </Switch>   
      );
    }
  return (
  	<div>
  	<Layout>
    {/*Only these following components will have access to the history, match, push pop method*/}
    {/*Navigation Possible in components/Navigation/NavigationItems.js*/}
     {routes} 
     </Layout>
    </div>
    
  );
 }
}
const mapStateToProps = state => {
  return{ 
      isAuthenticated : state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignup: () => dispatch(actions.authCheckState())
 }; 

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
