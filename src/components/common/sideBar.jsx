import React from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import Logo from "../../images/LogoMin.png"

const SideBar = ({ user }) => {
  return (
    <div className="sideBar-Container">
      <div className="sideBar-Sections">
        <div className="sideBar-Sections-UserInfo">
        <img src={Logo} className="image" width={"40px"}/>
        <div className="leftPadding">
        <h6 className="primary-text">Metro Hope Ministries</h6>

        </div>
          {/* <h1 className="display-3 light-text">{user.firstName}</h1>
          <h6 className="light-text">{user.email}</h6>
          <h5 className="light-text">Intake Coordinator</h5>
          <h4 className="light-text">
            {user.Center ? user.Center : "New Hope Center"}
          </h4> */}
        </div>
        <div className="sideBar-Sections-Nav">
          <Link to="/dashboard/" className="nav-item">
            <div className="sideBar-Sections-Nav-Item">
              <i className="fa fa-tachometer fa-2x primary-text" />
              <h4 className="primary-text rightspcae-2">Dashboard</h4>
            </div>
          </Link>
          {user.isIntakeCoordinator && 
          <Link to="/dashboard/create-resident" className="nav-item">
          <div className="sideBar-Sections-Nav-Item">
            <i
              className="fa fa-user-plus fa-2x primary-text"
              aria-hidden="true"
            ></i>
            <h4 className="primary-text  rightspcae-2">Create Resident</h4>
          </div>
        </Link>}
          <Link to="/dashboard/reports" className="nav-item">
            <div className="sideBar-Sections-Nav-Item">
              <i
                className="fa fa-pie-chart fa-2x primary-text"
                aria-hidden="true"
              ></i>
              <h4 className="primary-text  rightspcae-2">Reports</h4>
            </div>
          </Link>
          <Link to="/logout" className="nav-item">
            <div className="sideBar-Sections-Nav-Item">
              <i
                className="fa fa-sign-out fa-2x primary-text"
                aria-hidden="true"
              ></i>
              <h4 className="primary-text  rightspcae-2">Log out</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
