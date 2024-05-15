/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Joi from "joi-browser";

import "react-confirm-alert/src/react-confirm-alert.css";
import Form from "../common/simpleForm";
import { getUserUpdateObject } from "../../utils/userUpdateObject";
import { getUserByID, updateUser } from "../../services/users/users_admin";
import { getAllCenters } from "../../services/centerService";

const ManageUser = (props) => {
  const UserID = window.location.pathname.split("/")[3];
  const [user, setUser] = useState();
  const [profileUpdateData, setProfileUpdateData] = useState(
    getUserUpdateObject()
  );
  const [RoleUpdateData, setRoleUpdateData] = useState([
    [
      {
        name: "role_0_0_Center",
        label: "Center",
        options: [],
        value: undefined,
        type: "select",
        size: "grow1",
        schema: Joi.string(),
      },
    ],
    [
      {
        name: "role_1_0_Role",
        label: "Role",
        options: [
          { _id: "isCenterCoordinator", name: "Center Coordinator" },
          { _id: "isIntakeCoordinator", name: "Intake Coordinator" },
          { _id: "isCaseCoordinator", name: "Case Coordinator" },
          { _id: "isHouseManager", name: "House Manager" },
        ],
        value: undefined,
        type: "select",
        size: "grow1",
        schema: Joi.string(),
      },
    ],
  ]);
  const [ProfileUpdatemessage, setProfileUpdatemessage] = useState("");
  const [RoleUpdatemessage, setRoleUpdatemessage] = useState("");

  useEffect(() => {
    const getandSetUser = async () => {
      try {
        //get Centers
        let centers = await getAllCenters();
        let tempRoleUpdateData = [...RoleUpdateData];
        tempRoleUpdateData[0][0].options = centers.map((center) => ({
          _id: center.ID,
          name: center.Name,
        }));
        setRoleUpdateData(tempRoleUpdateData);

        //get Resident
        let { data: queriedUser } = await getUserByID(UserID);
        if (queriedUser) {
          console.log(queriedUser);
          setUser(queriedUser);
        }
      } catch (error) {
        //
      }
    };
    getandSetUser();
  }, []);

  useEffect(() => {
    //setProfile
    if (user) {
      const tempProfieData = [...profileUpdateData];
      profileUpdateData.forEach((row, i) => {
        row.forEach((item, i2) => {
          let key = item.name.split("_")[3];
          if (user[key]) tempProfieData[i][i2].value = user[key];
        });
      });
      setProfileUpdateData(tempProfieData);

      const tempRoleUpdateData = [...RoleUpdateData];
      if (user.Center) {
        tempRoleUpdateData[0][0].options.forEach((center) => {
          if (center._id === user.Center) {
            tempRoleUpdateData[0][0].value = center.name;
          }
        });
      }
      tempRoleUpdateData[1][0].value = user.isAdmin
        ? "Admin"
        : user.isIntakeCoordinator
        ? "Intake Coordinator"
        : user.isCenterCoordinator
        ? "Center Coordinator"
        : user.isCaseCoordinator
        ? "Case Coordinator"
        : user.isHouseManager
        ? "House Manager"
        : undefined;
        setRoleUpdateData(tempRoleUpdateData)
    }
  }, [user]);

  // Profile updation
  const handleProfileFieldUpdation = (name, item) => {
    setProfileUpdatemessage(undefined);
    let tempProfileData = [...profileUpdateData];
    tempProfileData[parseInt(name[1], 10)][parseInt(name[2], 10)] = item;
    return setProfileUpdateData(tempProfileData);
  };

  const handleProfileUpdateSubmit = async ({ validation, errorData }) => {
    if (validation) {
      const tempUser = { _id: user._id };
      profileUpdateData.forEach((row) => {
        row.forEach((item) => {
          let key = item.name.split("_")[3];
          tempUser[key] = item.value;
        });
      });

      try {
        await updateUser(tempUser);
        setProfileUpdatemessage("Saved!");
        let { data: queriedUser } = await getUserByID(UserID);
        if (queriedUser) {
          console.log(queriedUser);
          setUser(queriedUser);
        }
      } catch (error) {
        //@ts-ignore
        setProfileUpdatemessage("Failed to Save User");
      }
    } else {
      return setProfileUpdateData(errorData);
    }
  };

  const handleRoleFieldUpdate = (name, item) => {
    setRoleUpdatemessage(undefined);
    let tempRoleData = [...RoleUpdateData];
    tempRoleData[parseInt(name[1], 10)][parseInt(name[2], 10)] = item;
    return setRoleUpdateData(tempRoleData);
  };

  const handleRoleFieldSubmit = async ({ validation, errorData }) => {
    if (validation) {
      const tempUser = { _id: user._id };
      
      RoleUpdateData[0][0].options.forEach((center) =>{
            if(RoleUpdateData[0][0].value === center.name){
                tempUser.Center = center._id
            }
      })

      RoleUpdateData[1][0].options.forEach((role) =>{
        if(role.name === RoleUpdateData[1][0].value) tempUser[role._id] = true
        else tempUser[role._id] = false
      })

      try {
        await updateUser(tempUser);
        setRoleUpdatemessage("Saved!");
        let { data: queriedUser } = await getUserByID(UserID);
        if (queriedUser) {
          console.log(queriedUser);
          setUser(queriedUser);
        }
      } catch (error) {
        //@ts-ignore
        setRoleUpdatemessage("Failed to Save User Role");
      }
    } else {
      return setRoleUpdateData(errorData);
    }
  };

  return (
    <div className="residentView-Container">
      <div className="residentView-Header">
        <h2 className="primary">Manage User</h2>
      </div>
      <div className="residentView-Sections">
        {user && (
          <>
            <div className="residentView-sectionBox">
              <h3>User Info</h3>
              <div>
                <Form
                  data={profileUpdateData}
                  onChange={handleProfileFieldUpdation}
                  submit={handleProfileUpdateSubmit}
                  buttonLabel={"Save"}
                ></Form>
                {ProfileUpdatemessage && (
                  <div className="updateResident-footer">
                    {ProfileUpdatemessage}
                  </div>
                )}
              </div>
            </div>
            <div className="residentView-sectionBox">
              <h3>Roles and Permissions</h3>
              <div>
                <Form
                  data={RoleUpdateData}
                  onChange={handleRoleFieldUpdate}
                  submit={handleRoleFieldSubmit}
                  buttonLabel={"Save Role"}
                ></Form>
                {RoleUpdatemessage && (
                  <div className="updateResident-footer">
                    {RoleUpdatemessage}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageUser;
