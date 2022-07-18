import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import auth from "../services/authService";

import SideBar from "./common/sideBar";
import CreateAdmission from "./dashboardPages/createAdmission";
import CreateResident from "./dashboardPages/createResident";
import ExitResident from "./dashboardPages/exitResident";
import FindResident from "./dashboardPages/findResident";
import UpdateResident from "./dashboardPages/updateResident";
import Reports from "./dashboardPages/reports";

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
            <Route
              path="/dashboard/create-admission"
              component={CreateAdmission}
            />
            <Route
              path="/dashboard/exit"
              component={ExitResident}
            />
            <Route
              path="/dashboard/update-resident"
              component={UpdateResident}
            />
            <Route
              path="/dashboard/reports"
              component={Reports}
            />
            <Route path="/dashboard/" component={FindResident} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;
