import React from "react";
import { Link } from "react-router-dom";

const TopBar = ({ user }) => {
  return (
    <div className="topBar-Container">
      <div className="topBar-Sections">
        <div className="topBar-Sections-1">
          <i className="fa fa-home fa-2x primary-text" aria-hidden="true"></i>
          <h4 className="primary-text Center-Name">
            {user.Center ? user.Center : "New Hope Center"}
          </h4>
        </div>
        <div className="topBar-Sections-2">
          <div className="topBar-Sections-2-profileBox flex">
            <div className="user-profile-box">
              <i className="fa fa-user fa-2x light-text" aria-hidden="true"></i>
            </div>
            <div className="topBar-Sections-2-profileText">
              <h5 className="primary-text">{user.firstName}</h5>
              <text className="primary-text">{user.email}</text>
            </div>
          </div>
          <div className="topBar-Sections-2-Logout">
            <Link to="/logout" className="nav-item">
              <div className="topBar-Sections-2-Logout">
                <i
                  className="fa fa-sign-out fa-2x primary-text paddingLeft1"
                  aria-hidden="true"
                ></i>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
    // {/* <h5 className="light-text">Intake Coordinator</h5> */}
  );
};

export default TopBar;
