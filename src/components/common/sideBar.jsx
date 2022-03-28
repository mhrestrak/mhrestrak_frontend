import React from "react";
import { Link } from "react-router-dom";

const SideBar = ({ user }) => {
  return (
    <div className="sideBar-Container">
      <div className="sideBar-Sections">
        <div className="sideBar-Sections-UserInfo">
          <h1 className="display-3 light-text">{user.firstName}</h1>
          <h6 className="light-text">{user.email}</h6>
          <h5 className="light-text">Intake Coordinator</h5>
          <h4 className="light-text">
            {user.Center ? user.Center : "New Hope Center"}
          </h4>
        </div>
        <div className="sideBar-Sections-Nav">
          <Link to="/dashboard/" className="nav-item">
            <div className="sideBar-Sections-Nav-Item">
              <i className="fa fa-th-list fa-2x light-text" />
              <h4 className="light-text rightspcae-2">Dashboard</h4>
            </div>
          </Link>
          {user.isIntakeCoordinator && 
          <Link to="/dashboard/create-resident" className="nav-item">
          <div className="sideBar-Sections-Nav-Item">
            <i
              className="fa fa-pencil-square-o fa-2x light-text"
              aria-hidden="true"
            ></i>
            <h4 className="light-text  rightspcae-2">Create resident</h4>
          </div>
        </Link>}
          <Link to="/dashboard/reports" className="nav-item">
            <div className="sideBar-Sections-Nav-Item">
              <i
                className="fa fa-bar-chart fa-2x light-text"
                aria-hidden="true"
              ></i>
              <h4 className="light-text  rightspcae-2">Reports</h4>
            </div>
          </Link>
          <Link to="/logout" className="nav-item">
            <div className="sideBar-Sections-Nav-Item">
              <i
                className="fa fa-sign-out fa-2x light-text"
                aria-hidden="true"
              ></i>
              <h4 className="light-text  rightspcae-2">Log out</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
