import React,{ Component } from 'react';
import { connect } from 'react-redux'; //used to connect the actions and reducers from the store
import * as actions from '../../../store/actions/index';
class Logout extends Component {
    componentDidMount(){
        this.props.history.push('/');
        this.props.onLogout();
    }
    render(){
        return(
            <div></div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return{
      onLogout: () => dispatch(actions.logout())
    };
  };
export default connect(null, mapDispatchToProps)(Logout);