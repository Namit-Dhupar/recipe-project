import * as actionTypes from '../actions/actionTypes';

const initState = {
    order: [],
    loading: false,
    purchased: false
}

const reducer = (state = initState, action) => {
    switch(action.type){ //Adds logics the actions to be dispatched
        case actionTypes.PURCHASE_INIT:
            return{
               ...state,
               purchased: false
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = { //From actions/order.js
                ...action.orderData,
                id: action.orderId
            }
            return{
               ...state,
               loading: false,
               purchased: true,
               order: state.order.concat(newOrder) //Returns a newer array
            };
        case actionTypes.PURCHASE_BURGER_FAILURE:
            return{
                ...state,
                loading: false
            };
        case actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading: true
            };
        case actionTypes.FETCH_ORDER_START:
            return{
                ...state,
                loading: true
            };
        case actionTypes.FETCH_ORDER_SUCCESS:
            return{
                ...state,
                order: action.order,
                loading: false
            };
        case actionTypes.FETCH_ORDER_FAILURE:
            return{
                ...state,
                loading: false
            }               
        default:
            return state;
  }
};

export default reducer;