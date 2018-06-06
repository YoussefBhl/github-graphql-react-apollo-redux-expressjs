import React from "react";
import ReactDOM from "react-dom";
import { Route, Router, Redirect, BrowserRouter } from "react-router-dom";
import Login from "./common/Login";
import { store } from "./store.js"
import { Provider } from 'react-redux';
import Home from "./pages/Home";

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
      <Login></Login>
      </Provider>
    );
  }
}


const app = document.getElementById('app');
ReactDOM.render(
  <App />, app);