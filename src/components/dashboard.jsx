import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import auth from "../services/authService";

import SideBar from "./common/sideBar";
import CreateResident from "./dashboardPages/createResident";
import FindResident from "./dashboardPages/findResident";

class Dashboard extends Component {
  state = {
    user: {
      firstName: "",
      email: "",
      lastName: "",
    },
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="dashboard">
        <div className="dashboard-sideBar">
          <SideBar user={user} />
        </div>
        <div className="dashboard-main-routes">
          <Switch>
            <Route
              path="/dashboard/create-resident"
              component={CreateResident}
            />
            <Route path="/dashboard/" component={FindResident} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;
