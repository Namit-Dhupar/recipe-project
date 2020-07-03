import React from 'react';
import styles from './CustomButton.module.css';

const CustomButton = (props) =>{
	return(
   <button 
   className={[styles.Button, styles[props.btntype]].join(' ')}
   onClick = {props.clicked}>
   {props.children}
   </button>
  );
}

export default CustomButton;