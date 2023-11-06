import React from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import Logo from "../../images/LogoMin.png"
import { level2Access, level4Access } from "../../utils/roles";

const SideBar = ({ user }) => {
  console.log(user)
  return (
    <div className="sideBar-Container">
      <div className="sideBar-Sections">
        <div className="sideBar-Sections-UserInfo">
        <Link to="/dashboard/">
        <img src={Logo} className="image" width={"50px"}/>
        </Link>
        <div className="leftPadding">
        <Link to="/dashboard/" style={{textDecoration:"none"}}>
        <h6 className="primary-text">Metro Hope Ministries</h6>
        </Link>

        </div>
          {/* <h1 className="display-3 light-text">{user.firstName}</h1>
          <h6 className="light-text">{user.email}</h6>
          <h5 className="light-text">Intake Coordinator</h5>
          <h5 className="light-text">
            {user.Center ? user.Center : "New Hope Center"}
          </h5> */}
        </div>
        <div className="sideBar-Sections-Nav">
          <Link to="/dashboard/" className="nav-item">
            <div className="sideBar-Sections-Nav-Item">
              <i className="fa fa-users fa-2x primary-text" aria-hidden="true"/>
              <h5 className="primary-text rightspcae-2">Residents</h5>
            </div>
          </Link>
          {level2Access(user) && 
          <Link to="/dashboard/create-resident" className="nav-item">
          <div className="sideBar-Sections-Nav-Item">
            <i
              className="fa fa-user-plus fa-2x primary-text"
              aria-hidden="true"
              ></i>
            <h5 className="primary-text  rightspcae-2">Create Resident</h5>
          </div>
        </Link>}
              {level4Access(user) && 
          <Link to="/dashboard/reports" className="nav-item">
            <div className="sideBar-Sections-Nav-Item">
              <i
                className="fa fa-pie-chart fa-2x primary-text"
                aria-hidden="true"
              ></i>
              <h5 className="primary-text  rightspcae-2">Reports</h5>
            </div>
          </Link>
          }
          {level4Access(user) && 
          <Link to="/dashboard/user-management" className="nav-item">
          <div className="sideBar-Sections-Nav-Item">
            <i
              className="fa fa-id-badge fa-2x primary-text"
              aria-hidden="true"
            ></i>
            <h5 className="primary-text  rightspcae-2">User Management</h5>
          </div>
        </Link>}
          <Link to="/dashboard/checkin" className="nav-item">
          <div className="sideBar-Sections-Nav-Item">
            <i
              className="fa fa-mobile fa-3x primary-text"
              aria-hidden="true"
            ></i>
            <h5 className="primary-text  rightspcae-2">Device Check In</h5>
          </div>
        </Link>
          <Link to="/logout" className="nav-item">
            <div className="sideBar-Sections-Nav-Item">
              <i
                className="fa fa-sign-out fa-2x primary-text"
                aria-hidden="true"
              ></i>
              <h5 className="primary-text  rightspcae-2">Log out</h5>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
