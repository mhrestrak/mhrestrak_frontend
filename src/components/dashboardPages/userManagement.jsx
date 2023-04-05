import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import uniqId from "uniqid";

import NoDataBox from "../common/noDataBox";
import InputFieldLayoutRow from "../common/inputFieldLayoutRow";
import { getUsers } from "../../services/users/users_admin";
import { getAllCenters } from "../../services/centerService";

function UserManagement(props) {
  const [filters, setFilters] = useState([
    {
      name: "Center",
      label: "Center",
      options: [],
      value: undefined,
      type: "select",
      size: "grow1",
    },
    {
      name: "Role",
      label: "Role",
      options: [
        { _id: "isCenterCoordinator", name: "Center Coordinator" },
        { _id: "isIntakeCoordinator", name: "Intake Coordinator" },
        { _id: "isCaseCoordinator", name: "Case Coordinator" },
        { _id: "isHouseManager", name: "House Manager" }
      ],
      value: undefined,
      type: "select",
      size: "grow1",
    },
    {
      name: "Status",
      label: "Status",
      options: [
        {_id : "active", name : "Active"},
        {_id : "invited", name : "Invited"},
      ],
      value: undefined,
      type: "select",
      size: "grow1",
    },
  ]);

  const [users, setUsers] = useState([]);

  const filterChange = (data, name) => {
    console.log(data.currentTarget.value)
    let tempFilters = [...filters];
    filters.forEach((item, i) => {
      if (item.name === name) {
        tempFilters[i].value = data.currentTarget.value;
      }
    });
    setFilters(tempFilters);
  };

  useEffect(() => {
    async function onReady(){
        let centers = await getAllCenters()
        let tempFilters = [...filters]
        tempFilters[0].options = centers.map((center) => ({_id : center.ID, name : center.Name}))
        setFilters(tempFilters)
    }
    onReady()
  }, []);

  useEffect(() => {
    getfilteredUsers()
  }, [filters]);

  const getfilteredUsers = async () => {
    let selectedFilters  = {}
    filters.forEach((filter) =>{
        if(filter.name === "Center"){
            filter.options.forEach((center) =>{
                if(center.name === filter.value){
                    selectedFilters[filter.name] = center._id
                }
            })
        }else{
            selectedFilters[filter.name] = filter.value
        }
    })
    try {
        let {data , error} = await getUsers(selectedFilters)
        if(error) return setUsers([])
        setUsers(data)
    } catch (error) {
        setUsers([])
    }
  };

  const getCenterName  =(id) =>{
    let name
   if(filters[0].options.length >0){
       filters[0].options.forEach((filter) =>{
            if(filter._id === id){
                name = filter.name
            }
       })
       return name
   }else{
        return "-"
   }
  }

  return (
    <div className="reports-Container">
      <div className="createResident-Container-headSection">
        <h2 className="display-6 primary-text">User Management</h2>
      </div>
      <div className="UserManagement-FilterSection">
        <div className="UserManagement-FilterSection-inputs">
          <InputFieldLayoutRow data={filters} onChange={filterChange} />
        </div>
        <div className="UserManagement-FilterSection-button">
        <Link
                          to={`/dashboard/invite-user`}
                          className="nav-item"
                        >
          <button className="b">Send Invitation</button>
          </Link>
        </div>
      </div>

      {users.length > 0 ? (
        <>
          <div className="findResident-Container-data-bold">
            <div id={uniqId()} className="findResident-Container-data-header">
              {/* <div className="findResident-Container-data-Item-ind grow03 bold"></div> */}
              <div className="findResident-Container-data-Item-ind grow2 bold">
                Name
              </div>
              <div className="findResident-Container-data-Item-ind grow1 center bold">
                Role
              </div>
              <div className="findResident-Container-data-Item-ind grow2 center bold">
                Center
              </div>
              <div className="findResident-Container-data-Item-ind grow1 center bold">
                Status
              </div>
              <div className="findResident-Container-data-Item-ind grow1" />
            </div>
          </div>
          <div className="findResident-scrollable-container">
            <div className="findResident-scrollable">
              {users.length > 0 && (
                <div className="findResident-Container-data">
                  {users.map((user) => (
                    <div
                      id={uniqId()}
                      className="findResident-Container-data-Item"
                    >

                      <div className="findResident-Container-data-Item-ind grow2">
                        {`${user.firstName} ${user.lastName && " "+ user.lastName}`}
                      </div>

                      <div className="findResident-Container-data-Item-ind grow1 center greyText">
                        {user.isAdmin ? 
                            "Admin" : 
                            user.isIntakeCoordinator ? 
                                "Intake Coordinator" :
                                user.isCenterCoordinator ?
                                    "Center Coordinator" :
                                    user.isCaseCoordinator ?
                                        "Case Coordinator" :
                                        user.isHouseManager ?
                                            "House Manager" : 
                                            "-"
                        }
                      </div>

                      <div className="findResident-Container-data-Item-ind grow2 center greyText">
                        {`${user.Center? getCenterName(user.Center) : "-"}`}
                      </div>

                      <div className="findResident-Container-data-Item-ind grow1 center">
                        {user.isActive ? 
                                <div className="inputLabel">
                                    Active
                                </div> : 
                                user.invitePending ? 
                                    "Invited" : 
                                    "Disabled"}
                      </div>


                      <div className="findResident-Container-data-Item-ind grow1 center">
                        <Link
                          to={`/dashboard/manage-user/${user._id}`}
                          className="nav-item"
                        >
                          <button className="b">Manage</button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <NoDataBox message={"No Users Found"} />
      )}
    </div>
  );
}

export default UserManagement;
