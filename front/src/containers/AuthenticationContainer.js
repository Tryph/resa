import { connect } from 'react-redux';

import { getProfile, login } from '../actions';
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
    onProfile: () => dispatch(getProfile())
  }
}


export default connect(stateToProps, dispatchToProps)(Authentication);
