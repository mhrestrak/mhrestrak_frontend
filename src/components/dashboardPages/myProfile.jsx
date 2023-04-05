/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import "react-confirm-alert/src/react-confirm-alert.css";
import Form from "../common/simpleForm";
import { getUserUpdateObject } from "../../utils/userUpdateObject";
import auth from "../../services/authService";

const MyProfile = (props) => {
  const [user, setUser] = useState();
  const [profileUpdateData, setProfileUpdateData] = useState(
    getUserUpdateObject()
  );

  const [ProfileUpdatemessage, setProfileUpdatemessage] = useState("");
  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
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
        await auth.updateProfile(tempUser);
        setProfileUpdatemessage("Updated!");
      } catch (error) {
        console.log(error)
        //@ts-ignore
        setProfileUpdatemessage("Failed to Update Profile");
      }
    } else {
      return setProfileUpdateData(errorData);
    }
  };

  return (
    <div className="residentView-Container">
      <div className="residentView-Header">
        <h2 className="primary">My Profile</h2>
      </div>
      <div className="residentView-Sections">
        {user && (
          <>
            <div className="profileView-sectionBox">
              <div>
                <Form
                  data={profileUpdateData}
                  onChange={handleProfileFieldUpdation}
                  submit={handleProfileUpdateSubmit}
                  buttonLabel={"Update"}
                ></Form>
                {ProfileUpdatemessage && (
                  <div className="updateResident-footer">
                    {ProfileUpdatemessage}
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

export default MyProfile;
