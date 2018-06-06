import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions/user.actions';
import Home from '../pages/Home';

class Login extends React.Component {
  render () {
    if (localStorage.getItem('token'))  return <Home />
    else if (window.location.search) {
      const { dispatch } = this.props;
      const token = window.location.search.split('=')[1].split('&')[0];
      dispatch(userActions.login(token))
      return <Home />;
    }
    else window.location = 'http://127.0.0.1:3000/auth/github'
    return null;
  }
}
function mapStateToProps (state) {
  const { loggingIn } = state.authentication
  return { loggingIn }
}
Login = connect(mapStateToProps)(Login)
export default Login;
