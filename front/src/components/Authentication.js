import React, { Component } from 'react';


class Authentication extends Component {
  constructor(props) {
    super(props);

    this.state = {username: '', password: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('username:', this.state.username, 'password:', this.state.password);
    this.props.onLogin(this.state.username, this.state.password);
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
      content = <p>{username}</p>
    } else {
      content = (
        <form className="login-form" onSubmit={this.handleSubmit}>
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
  onLogout: React.PropTypes.func
};


export default Authentication;
