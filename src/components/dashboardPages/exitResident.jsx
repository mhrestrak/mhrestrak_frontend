import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getResidentExitObject } from "../../utils/residentExitObject";
import {
  getResidentByID,
  getAdmission,
  exitResident
} from "../../services/residentService";
import Form from "../common/simpleForm";

const UpdateResident = (props) => {
  const ResID = window.location.pathname.split("/")[3];
  const [data, setData] = useState({
    formStructure: [],
    resident: {},
    activeAdmission: {},
    resFound: 1,
    admissionFound: 1,
  });
  const [message, setMessage] = useState();

  useEffect(() => {
    let tempData = { ...data };
    const getandSetResident = async () => {
      try {
        let user = await getResidentByID(ResID);
        let {data : admission} = await getAdmission(ResID)
        tempData.activeAdmission = admission
        tempData.formStructure = await getResidentExitObject();
        tempData.resident = user.data;
        console.log(tempData.activeAdmission);
        tempData.formStructure[1][0]["value"] = new Date(tempData.activeAdmission.GuestInDate);
        tempData.resFound = 2;
        tempData.admissionFound = 2;
        setData(tempData);
      } catch (error) {
        tempData.resFound = 3;
        tempData.admissionFound = 3;
        setData(tempData);
        //@ts-ignore
        setMessage("Resident or admission data not found!");
      }
    };
    getandSetResident();
  }, []);

  const handleChange = (name, item) => {
    let updatedData = { ...data };
    updatedData.formStructure[parseInt(name[1], 10)][parseInt(name[2], 10)] =
      item;
    updatedData.activeAdmission[name[3]] = item.value;
    setData(updatedData);
  };

  const doSubmit = async ({ validation, errorData }) => {
    let updatedData = { ...data };

    if (validation) {
      try {
        console.log(data.activeAdmission);
        let notNullFields = {}
        Object.entries(data.activeAdmission).forEach((item)=> {
            if(item[1] !== null){
                notNullFields[item[0]] = item[1]
            }
        })
        let result = await exitResident(notNullFields);
        console.log(result);
        //@ts-ignore
        setMessage("Updated");
      } catch (error) {
        //@ts-ignore
        setMessage("Failed to Update Resident");
      }
    } else {
      updatedData.formStructure = errorData;
      setData(updatedData);
    }
  };

  return (
    <div className="exitResident-Container">
      <div className="createResident-Container-headSection">
        <h2 className="primary">
          {data.resident.ResFirstName
            ? `Exit Resident ${
                data.resident.ResFirstName + " " + data.resident.ResLastName
              }`
            : "Loading..."}
        </h2>
      </div>
      {data.resFound === 2 && (
        <>
          {/* @ts-ignore */}
          <Form
            data={data.formStructure}
            onChange={handleChange}
            submit={doSubmit}
            buttonLabel={"Exit Resident"}
          ></Form>
          {message && <div className="updateResident-footer">{message}</div>}
        </>
      )}
    </div>
  );
};

export default UpdateResident;
