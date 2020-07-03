import * as actionTypes from '../actions/actionTypes';

const initState = {
    token: null,
    userID: null,
    error: null,
    loading: false
};

const reducer = (state = initState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            };
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                loading: false,
                token: action.idToken,  //Obtained in response.data
                userID: action.userID,  
                error: null
            };
        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                error: action.error,
                loading: false
            }; 
        case actionTypes.AUTH_LOGOUT: //dispatched to actions
            return{
                ...state,
                token: null,
                userID: null
            };        
        default:
            return state;    
    }
};

export default reducer;
