import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import logo from "./../images/logo.png";

import Form from "./common/simpleForm";
import { Redirect, useHistory } from "react-router-dom";
import { activateUser } from ".././services/authService";
import { getUserStatus} from ".././services/users/users_admin";

const CompleteSignup = () => {
    const userID = window.location.pathname.split("/")[2];
    
    const [message, setMessage] = useState("");
    const [done, setDone] = useState(false);
    const [data, setData] = useState([
        [
            {
                name: "user_0_0_pass",
                label: "Create Password",
                value: undefined,
                type: "input",
                size: "grow1",
                schema: Joi.string().min(8).max(16).required(),
            },
        ],
    ]);
    const history = useHistory()
    
  useEffect(() =>{
    const getandSetUser = async () => {
        try {
          //get Resident

          if(!userID) return setDone(true)
          let { data: queriedUser } = await getUserStatus(userID);
          console.log(queriedUser)
          if (queriedUser) {
            if(queriedUser.isActive || !queriedUser.invitePending) return setDone(true)
          }
        } catch (error) {
          return setDone(true)
        }
      };
      getandSetUser();
  },[])

  const handleProfileFieldUpdation = (name, item) => {
    let tempUserData = [...data];
    tempUserData[parseInt(name[1], 10)][parseInt(name[2], 10)] = item;
    return setData(tempUserData);
  };

  const handleProfileUpdateSubmit = async ({ validation, errorData }) => {
    if (validation) {
      const tempUser = { _id: userID };
      tempUser.pass = data[0][0].value;

      try {
        let data = await activateUser(tempUser);
        history.push('/')
      } catch (error) {
        console.log(error)
        //@ts-ignore
        setMessage("Failed to Invite User");
      }
    } else {
      return setData(errorData);
    }
  };

  return (!userID || done ? <Redirect to="/dashboard" /> :
    <div className="loginContainer">
      <div className="container">
        <div className="box">
          <div className="imageCon">
            <img src={logo} className="image" width={"30%"} />
          </div>
          {/* <h1 className="display-1">Welcome to MetroHope Ministries</h1> */}
          <div className="cScontainer">
            <h2 className="display-5">Complete your signup</h2>
            <div className="box-input">
              <div>
                <Form
                  data={data}
                  onChange={handleProfileFieldUpdation}
                  submit={handleProfileUpdateSubmit}
                  buttonLabel={"Sign Up"}
                ></Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteSignup;
