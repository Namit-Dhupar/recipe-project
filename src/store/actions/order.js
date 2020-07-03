import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

//Synchronous FOR POSTING ORDERS
export const purchaseBurgerSuccess = (id, orderData) => {
    return { //These properties are defined in the Reducer/order.js
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILURE,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return { 
         type: actionTypes.PURCHASE_BURGER_START
    };
 };
 
 export const purchaseInit = () =>{
     return{
       type: actionTypes.PURCHASE_INIT
     };
   };

   //Synchronous FOR FETCHING ORDERS
  export const fetchOrderSuccess = (order) =>{
     return{
       type: actionTypes.FETCH_ORDER_SUCCESS,
       order: order
     }; 
  };
  
  // export const fetchOrderFail = (error) =>{
  //   return{
  //     type: actionTypes.FETCH_ORDER_FAILURE,
  //     error: error
  //   };
  // };

  export const fetchOrderStart = () =>{
    return{
      type: actionTypes.FETCH_ORDER_START
    };
  };


//Asynchronous Code for Posting Orders
//Uses the above synchronous function calls here
export const purchasBurger = (orderData, token) => {
    return dispatch =>{
        dispatch(purchaseBurgerStart()); //dispatches the action of this function upon the function call
        axios.post('/orders.json?auth='+token, orderData)//.json is the endpoint for firebase 
       .then(response =>{
           console.log(response.data); //response.data will serve as id
         dispatch(purchaseBurgerSuccess(response.data.name, orderData));
       }).catch(error =>{
         dispatch(purchaseBurgerFail(error));
       });
    };
};


//Asynchronous Code for fetching orders
export const fetchOrder = (token, userID) =>{ //Token obtained from auth reducer
  return dispatch =>{
    dispatch(fetchOrderStart());
    //fetch orders according to the userID
    const queryParams = '?auth=' + token + '&orderBy="userID"&equalTo="'  + userID + '"';
    axios.get('/orders.json'+ queryParams).then(res=>{ //We need to pass the token for only valid users to access the orders
      const fetchedOrder = [];
      for(let key in res.data){
          fetchedOrder.push({
              ...res.data[key],
              id: key
          });
      }
      dispatch(fetchOrderSuccess(fetchedOrder));
  })
  };
};