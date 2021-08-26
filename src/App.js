import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import auth from "./services/authService";
import { ToastContainer } from "react-toastify";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import Dashbord from "./components/dashboard";
import ProtectedRoute from "./components/common/protectedRoute";
import NotFound from "./components/notFound";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    // const { user } = this.state;
    return (
      <div>
        <ToastContainer />
        <div className="content">
          <Switch>
            <ProtectedRoute path="/dashboard" component={Dashbord} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={LoginForm} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
