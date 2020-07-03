import React,{ Component } from 'react';
import { connect } from 'react-redux'; //used to connect the actions and reducers from the store
import Hoc from '../../hoc/hoc';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import styles from './Layout.module.css'; // Import css modules stylesheet as styles

class Layout extends Component{
   state = {
   	showSideDrawer: false
   }

   sideDrawerClosedHandler = () =>{
    this.setState({showSideDrawer: false});
   }

   sideDrawerOpenHandler = () =>{
    this.setState({showSideDrawer: true});
   }

	render(){
	return(
	<Hoc>
  <Toolbar toggleopen={this.sideDrawerOpenHandler} isAuth={this.props.isAuthenticated}/>
  <SideDrawer isAuth={this.props.isAuthenticated}
  opening={this.state.showSideDrawer} 
  closed={this.sideDrawerClosedHandler}/>
    <main className = {styles.Content}>
  	{this.props.children}
  </main>
 </Hoc>
		);
	}
}

const mapStateToProps = state => {
  return{
    isAuthenticated : state.auth.token !== null
  };
}
export default connect(mapStateToProps, null)(Layout);