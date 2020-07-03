import React from 'react';
import Hoc from '../../../../hoc/hoc';

const Hamburger = (props) =>{
	return(
    <Hoc>
     <div onClick={props.opentoggle}>{props.children}</div>
    </Hoc>
  );
}

export default Hamburger;