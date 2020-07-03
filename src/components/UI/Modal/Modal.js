import React from 'react';
import styles from './Modal.module.css'
import Hoc from '../../../hoc/hoc';
import Backdrop from '../Backdrop/Backdrop';
const Modal = (props) =>{ //inline styling tells that if show is true which is defined in BurgerBuilder
	return(
		<Hoc>
	<Backdrop 
    showbackdrop={props.show /*Show when props.show is true*/}
    clicked={props.Modalclosed}/>
    <div className={styles.Modal}
    style={{
    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
    opacity: props.show ? '1' : '0' 
    }}>
    	{props.children}
    </div>
    </Hoc>
  )
};

export default Modal;