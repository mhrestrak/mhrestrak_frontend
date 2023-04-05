import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCenters } from "../../services/centerService";

const TopBar = ({ user }) => {
  const [userCenter, setUserCenter] = useState("Dashboard")

  useEffect(() => {
    const getandSetUser = async () => {
      try {
        //get Centers
        let centers = await getAllCenters();
        console.log(user, "p")
        centers.forEach((center) => {
          if(center.ID === user.Center) setUserCenter(center.Name)
        });
      } catch (error) {
        //
      }
    };
    if(user.Center){
      getandSetUser();
    }
  }, [user]);

  return (
    <div className="topBar-Container">
      <div className="topBar-Sections">
        <div className="topBar-Sections-1">
          <i className="fa fa-home fa-2x primary-text" aria-hidden="true"></i>
          <h4 className="primary-text Center-Name">
            {`${user.isAdmin ? 
                            "Admin Dashboard" : user.Center ? userCenter : "New Hope Center"}`}
          </h4>
        </div>
        <div className="topBar-Sections-2">
          <div className="topBar-Sections-2-profileBox flex">
            <div className="topBar-Sections-2-profileText">
              <div>{`${user.firstName} ${user.lastName}`}</div>
              <div className="primary-text">{user.isAdmin ? 
                            "Admin" : 
                            user.isIntakeCoordinator ? 
                            "Intake Coordinator" :
                            user.isCenterCoordinator ?
                            "Center Coordinator" :
                            user.isCaseCoordinator ?
                            "Case Coordinator" :
                            user.isHouseManager ?
                            "House Manager" : 
                            "-"}</div>
                            {/* <div className="primary-text">{user.email}</div> */}
            </div>
          </div>
          <div className="topBar-Sections-2-Logout">
            <Link to="/dashboard/myProfile" className="nav-item">
            <div className="user-profile-box">
              <i className="fa fa-user fa-2x light-text" aria-hidden="true"></i>
            </div>
            </Link>
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
