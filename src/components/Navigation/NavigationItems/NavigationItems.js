import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
const NavigationItems = (props) =>{
	return(
  <ul className={styles.NavigationItems}>
  <NavigationItem link="/" exactly>Burger Builder</NavigationItem>{/*To only active highlight the current tab*/}
  {props.isAuthenticated
  ? <NavigationItem link="/orders">Orders</NavigationItem>
  : null}
  {!props.isAuthenticated //Props flow from Layout.js -> NavigateItem(SideDrawer.js & Toolbar.js) -> here 
  ? <NavigationItem link="/auth">Authentication</NavigationItem> 
  : <NavigationItem link="/logout">Logout</NavigationItem> }
  </ul>
 );
}

export default NavigationItems;