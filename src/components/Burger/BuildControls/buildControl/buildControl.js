import React from 'react';
import styles from './buildControl.module.css';

const BuildControl = (props) =>{
  return (
    <div className={styles.BuildControl}>
    <div className={styles.Label}>
    {props.label}
    </div>
    <button className={styles.Less} onClick={props.lessbutton} 
disabled={props.disabled/*Coming from BuildControls.js property*/}>Less</button>
    <button className={styles.More} onClick={props.morebutton}>More</button>
    </div>
  );
}
export default BuildControl;
