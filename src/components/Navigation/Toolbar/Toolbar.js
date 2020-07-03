import React from 'react';
import styles from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Hamburger from '../SideDrawer/Hamburger/Hamburger';
const Toolbar = (props) =>{
	return (
		<header className={styles.Toolbar}>
		<Hamburger opentoggle={props.toggleopen /*Derived from Layout's Toggle tag*/}>
		MENU</Hamburger>
		<div>LOGO</div>
		<nav className={styles.DesktopOnly}>
		<NavigationItems isAuthenticated = {props.isAuth}/>
		</nav>
		</header>
  );
}

export default Toolbar;