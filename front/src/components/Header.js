import React, { Component } from 'react';

import AuthenticationContainer from '../containers/AuthenticationContainer';


class Header extends Component {
  render() {
    return(
      <div className="header">
        <h1>Résa</h1>
        <AuthenticationContainer/>
      </div>
    );
  }
}


export default Header;
