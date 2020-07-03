import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Backdrop from  '../../UI/Backdrop/Backdrop';
import Hoc from '../../../hoc/hoc';
//Used for Mobile Display
const SideDrawer = (props) =>{
	//Logic for Opening or closing the SideDrawer
	let attachedStyles = [styles.SideDrawer, styles.Close];
	if(props.opening){
		attachedStyles = [styles.SideDrawer, styles.Open];
	}
	return(
		<Hoc>
		<Backdrop showbackdrop={props.opening} clicked={props.closed}/>
		<div className={attachedStyles.join(' ')}>
			<nav>
			Logo
			<NavigationItems isAuthenticated = {props.isAuth}/>
			</nav>
		</div>
		</Hoc>
  );
}

export default SideDrawer;