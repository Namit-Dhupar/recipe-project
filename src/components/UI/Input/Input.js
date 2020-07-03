import React from 'react';
import Styles from './Input.module.css';

/**************FORMS IN REACTS JS PART 1*******************/
/**************FOR FORM VALIDATION USE FORMIK WITH YUP/ react-hooks-form + yup***********/
/*Distributing properties all over the Properties*/
const Input = (props) =>{ 
    let inputElement = null;
    switch(props.elementType){
        case('input'):
          inputElement = <input 
          className={Styles.InputElement} 
          {...props.elementConfig} 
          value={props.value}
              onChange={props.changed}
          />
          break;
        case('textarea'):
          inputElement = <textarea 
          className={Styles.InputElement} 
          {...props.elementConfig} 
          value={props.value}
              onChange={props.changed}
          />
          break;
        case('select'):
          inputElement = (
              <select 
              className={Styles.InputElement} 
              value={props.value}
              onChange={props.changed}>
              {props.elementConfig.options.map(option=>(
                  <option key={option.value} value={option.value}>
                      {option.displayValue}
                  </option>
              ))};
              </select>
          );
          break;  
        default:
            inputElement = <input 
            className={Styles.InputElement} 
            {...props.elementConfig} 
            value={props.value}
                onChange={props.changed}
            />
            break;  
    }
    return(
      <div className={Styles.Input}>
         <label className={Styles.label}>{props.label}</label>
         {inputElement}
      </div>
    );
}

export default Input;