import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/CustomButton/CustomButton';
import styles from './CheckoutSummary.module.css';

const CheckoutSummary = (props) =>{
    return(
        <div className={styles.CheckoutSummary}>
        <h1>Hope it tastes damn good!</h1>
        <div style={{width: '100%', margin: 'auto'}}>{/*Inline Styling in React JS*/}
            <Burger ingredients={props.ingredientos} />
        </div>
        <Button btntype='Danger' clicked={props.Checkoutcancel}>CANCEL</Button>
        <Button btntype='Success' clicked={props.Checkoutcontinue}>CONTINUE</Button>
        </div>
       );
}

export default CheckoutSummary;