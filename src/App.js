import React, {Component} from "react";
import {Route, Switch, Redirect} from "react-router-dom"
import auth from "./services/authService";
import { ToastContainer } from "react-toastify";
import LoginForm from "./components/loginForm";
import ProtectedRoute from "./components/common/protectedRoute";


import logo from './logo.svg';
import './App.css';


class App extends Component {
  state = {}

  componentDidMount(){
    const user = auth.getCurrentUser();
    this.setState({user});
  }

  render(){
    const {user} = this.state
    return (
      <div>
        <ToastContainer>
          <div className="content">
            <Switch>
              <ProtectedRoute path="/dashboard" />
              <Route path="/login" />

            </Switch>

          </div>
        </ToastContainer>
      </div>
    )
  }


}

export default App;
