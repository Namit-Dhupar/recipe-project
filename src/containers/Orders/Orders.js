import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import { connect } from 'react-redux'; //used to connect the actions and reducers from the store
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component{
    state = {
        orders: [],
        loading: true
    }
   
    componentDidMount(){
        //Before Redux:
        // axios.get('/orders.json').then(res=>{
        //     const fetchedOrder = [];
        //     for(let key in res.data){
        //         //console.log(res.data[key]); //fetched the orders json from our firebase enteries
        //         fetchedOrder.push({
        //             ...res.data[key],
        //             id: key
        //         });
        //     }
        //   // console.log(fetchedOrder); //Consists of orders array
        //     this.setState({loading: false, orders: fetchedOrder});
        // })
        //AFTER REDUX:
        this.props.onFetchOrder(this.props.token, this.props.userId);
    }

    render(){
        let orders = <Spinner />
        if(!this.props.loading){
                orders = this.props.order.map(order=>(
                    <Order key={order.id}
                    price={order.price}
                    ingredients={order.ingredients}
                />
              )
          );
        }
        if(this.props.order.length === 0){
            orders = <h4>You don't have any orders at the moment</h4>
        }
        return(
            <div>
        {orders}
         </div>
        );
    }
}
const mapStateToProps = state =>{
    return{
        order: state.order.order,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userID
    }
}
const mapDispatchToProps = dispatch => { 
    return{
      onFetchOrder: (token, userID) => dispatch(actions.fetchOrder(token, userID))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Orders, axios);
