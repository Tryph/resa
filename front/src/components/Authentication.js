import React, { Component } from 'react';


class Authentication extends Component {
  constructor(props) {
    super(props);

    this.state = {username: '', password: ''};

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentWillMount() {
    this.props.onProfile();
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.onLogin(this.state.username, this.state.password);
    this.setState({username: '', password: ''});
    return false;
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.onLogout();
    return false;
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  render() {
    let content;
    let username = this.props.username;
    if (username) {
      content = <p>{username} | <a onClick={this.handleLogout}>Déconnexion</a></p>
    } else {
      content = (
        <form className="login-form" onSubmit={this.handleLogin}>
          <input type="text" name="username" className="username"
                 value={this.state.username}
                 onChange={this.handleUsernameChange}/>
          <input type="password" name="password" className="password"
                 value={this.state.password}
                 onChange={this.handlePasswordChange}/>
          <button type="submit">Connexion</button>
        </form>
      );
    }

    return (
      <div className="authentication">
        {content}
      </div>
    );
  }
}


Authentication.propTypes = {
  username: React.PropTypes.object,
  onLogin: React.PropTypes.func,
  onLogout: React.PropTypes.func,
  onProfile: React.PropTypes.func
};


export default Authentication;
