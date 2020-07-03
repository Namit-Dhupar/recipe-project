import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
//NO LONGER NEEDED AS WE ARE COMBINING THE REDUCERS: import reducer from './store/reducers/burgerBuilder';
//Getting both the reducers to combine them
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'; //Routing Enabled
import thunk from 'redux-thunk'; //A middlware which helps in executing Async functions in react-redux 
//combineReducers are used to grouping together a bunch of Reducers together for a much leaner code
//Used for React DevTools for Async functions
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//Adding react devtool support as well as write Async functions
const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});
/*const store = BEFORE combineReducer: createStore(reducer, composeEnhancers(applyMiddleware(thunk))); AFTER combineReducer:*/
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const app = (
    <Provider store={store}>
    <BrowserRouter>
       <App />
   </BrowserRouter>
   </Provider>
   );
ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
