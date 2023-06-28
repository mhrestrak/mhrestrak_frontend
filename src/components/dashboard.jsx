import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import auth from "../services/authService";

import SideBar from "./common/sideBar";
import CreateAdmission from "./dashboardPages/createAdmission";
import CreateResident from "./dashboardPages/createResident";
import ExitResident from "./dashboardPages/exitResident";
import FindResident from "./dashboardPages/findResident";
import UpdateResident from "./dashboardPages/updateResident";
import ResidentView from "./dashboardPages/residentView";
import Reports from "./dashboardPages/reports";
import TopBar from "./common/topBar";
import UserManagement from "./dashboardPages/userManagement";
import ManageUser from "./dashboardPages/manageUser";
import MyProfile from "./dashboardPages/myProfile";
import InviteUser from "./dashboardPages/inviteUser";
import ExitGuest from "./dashboardPages/exitGuest";
import AdmissionRecord from "./dashboardPages/AdmissionRecord";

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
        <TopBar user={user}/>
        <div className="dashboard-main-Scrollable">
          <Switch>
            <Route
              path="/dashboard/create-resident"
              component={CreateResident}
            />
            <Route
              path="/dashboard/resident"
              component={ResidentView}
            />
            <Route
              path="/dashboard/create-admission"
              component={CreateAdmission}
            />
            <Route
              path="/dashboard/admission-record"
              component={AdmissionRecord}
            />
            <Route
              path="/dashboard/exit-guest"
              component={ExitGuest}
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
            <Route
              path="/dashboard/user-management"
              component={UserManagement}
            />
            <Route
              path="/dashboard/manage-user"
              component={ManageUser}
            />
            <Route
              path="/dashboard/myProfile"
              component={MyProfile}
            />
            <Route
              path="/dashboard/invite-user"
              component={InviteUser}
            />
            <Route path="/dashboard/" component={FindResident} />
          </Switch>
        </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
