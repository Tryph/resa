import React, { Component } from 'react';

import AuthenticationContainer from '../containers/AuthenticationContainer';


class Header extends Component {
  render() {
    return(
      <div className="header">
        <AuthenticationContainer/>
      </div>
    );
  }
}


export default Header;
