import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
 return {
   type: actionTypes.AUTH_START
 };
};

export const authSuccess = (token, userID) =>{
    return{
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userID: userID
    };
};

export const authFail = (error) =>{
    return {
    type: actionTypes.AUTH_FAIL,
    error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('localid');
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}
//Asynchronous
export const checkTimeout = (expirationTime)  => {
    return dispatch =>{
        setTimeout(() => {
         dispatch(logout());
        },expirationTime * 1000)
    }
}

export const auth = (email, password, isSignUp) =>{
    return dispatch =>{
        dispatch(authStart());
        //Payload to pass as parameters
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        //If in Sign Up Mode
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD7C8Xzx9ynKZTvg8gCkfMpb5fEoggjQrA';
        if(!isSignUp) //If in Sign In Mode
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD7C8Xzx9ynKZTvg8gCkfMpb5fEoggjQrA';
        axios.post(url,authData)
        .then(response => {
            console.log(response);
            //storing token in the local storage
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('localid', response.data.localId)
            //storing the token in redux
            dispatch(authSuccess(response.data.idToken, response.data.localId)); //local ID can be used as User ID
            dispatch(checkTimeout(response.data.expiresIn));
        })
        .catch(err =>{
            console.log(err);
            //storing the error message
            dispatch(authFail(err.response.data.error));
        });
    };
};

//Getting Token from local storage
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
           dispatch(logout());
        } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            dispatch(logout());
        } else{
           const localid = localStorage.getItem('localid');
           dispatch(authSuccess(token,localid));
           dispatch(checkTimeout((expirationDate.getTime() - new Date().getTime())/1000));
       }
     }
   };
};