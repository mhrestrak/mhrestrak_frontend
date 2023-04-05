/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Joi from "joi-browser";
import uniqid from "uniqid";

import "react-confirm-alert/src/react-confirm-alert.css";
import Form from "../common/simpleForm";
import { getUserUpdateObject } from "../../utils/userUpdateObject";
import { inviteUser } from "../../services/users/users_admin";
import { getAllCenters } from "../../services/centerService";

const InviteUser = (props) => {
  const [userData, setUserData] = useState([
    ...getUserUpdateObject(),
    [
      {
        name: "user_2_0_Center",
        label: "Center",
        options: [],
        value: undefined,
        type: "select",
        size: "grow1",
        schema: Joi.string().required(),
      },
    ],
    [
      {
        name: "user_3_0_Role",
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
        schema: Joi.string().required(),
      },
    ],
  ]);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const getCenter = async () => {
      try {
        //get Centers
        let centers = await getAllCenters();
        let tempUserData = [...userData];
        tempUserData[2][0].options = centers.map((center) => ({
          _id: center.ID,
          name: center.Name,
        }));
        setUserData(tempUserData);
      } catch (error) {
        //
      }
    };
    getCenter();
  }, []);

  // Profile updation
  const handleProfileFieldUpdation = (name, item) => {
    setMessage(undefined);
    let tempUserData = [...userData];
    tempUserData[parseInt(name[1], 10)][parseInt(name[2], 10)] = item;
    return setUserData(tempUserData);
  };

  const handleProfileUpdateSubmit = async ({ validation, errorData }) => {
    if (validation) {
      const tempUser = { _id: uniqid() };
      userData.forEach((row) => {
        row.forEach((item) => {
          let key = item.name.split("_")[3];
          tempUser[key] = item.value;
        });
      });
      tempUser.role = undefined;

      userData[2][0].options.forEach((center) => {
        if (userData[2][0].value === center.name) {
          tempUser.Center = center._id;
        }
      });

      userData[3][0].options.forEach((role) => {
        if (role.name === userData[3][0].value) tempUser[role._id] = true;
        else tempUser[role._id] = false;
      });

      try {
        let { data } = await inviteUser(tempUser);
        if (data.error) return setMessage(data.error);
        setMessage("Invitation sent to User");
        let tempUserData = [...userData];
        tempUserData.forEach((row, i) => {
          row.forEach((item, ii) => {
            tempUserData[i][ii].value = undefined;
          });
        });
        setUserData(tempUserData);
      } catch (error) {
        //@ts-ignore
        setMessage("Failed to Invite User");
      }
    } else {
      return setUserData(errorData);
    }
  };

  return (
    <div className="residentView-Container">
      <div className="residentView-Header">
        <h2 className="primary">Invite User</h2>
      </div>
      <div className="residentView-Sections">
        <div className="profileView-sectionBox">
          <div>
            <Form
              data={userData}
              onChange={handleProfileFieldUpdation}
              submit={handleProfileUpdateSubmit}
              buttonLabel={"Invite User"}
            ></Form>
            {message && <div className="updateResident-footer">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteUser;
