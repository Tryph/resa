import { connect } from 'react-redux';

import { login } from '../actions';
import Authentication from '../components/Authentication'


function stateToProps(state, ownProps) {
  return {
    username: state.user ? state.user.username : null,
    ...ownProps
  };
}


function dispatchToProps(dispatch, ownProps) {
  return {
    onLogin: (username, password) => dispatch(login(username, password)),
    onLogout: () => console.log("LOGOUT NOT IMPLEMENTED!"),
  }
}


export default connect(stateToProps, dispatchToProps)(Authentication);
