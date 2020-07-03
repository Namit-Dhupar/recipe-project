import React from 'react';
import styles from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) =>{
	return(
   <li className={styles.NavigationItem}>
   <NavLink to={props.link} 
   exact={props.exactly} activeClassName={styles.active}>{props.children}
   </NavLink>
   </li>
 );
}

export default NavigationItem;