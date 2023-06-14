import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getResidentExitObject } from "../../utils/residentExitObject";
import {
  getResidentByID,
  getAdmission,
  exitResident,
} from "../../services/residentService";
import Form from "../common/simpleForm";
import { Redirect } from "react-router-dom";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from "react-toastify";

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
  const [exited, setExited] = useState(false);
  const [daysHere, setDaysHere] = useState(0)

  useEffect(() => {
    let tempData = { ...data };
    const getandSetResident = async () => {
      try {
        let user = await getResidentByID(ResID);
        let { data: admission } = await getAdmission(ResID);
        tempData.activeAdmission = admission;
        tempData.formStructure = await getResidentExitObject();
        tempData.resident = user.data;
        console.log(tempData.activeAdmission);
        tempData.formStructure[1][0]["value"] = 
          new Date(Date.UTC(
            parseInt(tempData.activeAdmission.GuestInDate.substring(0, 4)),
            parseInt(tempData.activeAdmission.GuestInDate.substring(5, 7)) - 1, // Subtract 1 from the month since it's zero-based
            parseInt(tempData.activeAdmission.GuestInDate.substring(8, 10))
          ));
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
      console.log(name)
    updatedData.activeAdmission[name[3]] = item.value;
    if(item.value)
    if(name[1] === "1" && name[2] ==="1"){
      if(data.activeAdmission.GuestInDate){
        const days = getDaysBetweenDates(data.activeAdmission.GuestInDate, item.value)
        setDaysHere(days)
      }
    }
    return setData(updatedData);
  };

  const confirmSubmit = () => {
    confirmAlert({
      title: 'Confirm Exit',
      message: `The Resident ${data.resident.ResFirstName + " " + data.resident.ResLastName} is with us for ${daysHere} days, Are you sure you want to discharge ${data.resident.ResFirstName}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => submit()
        },
        {
          label: 'No',
          onClick: () => {
            return 
          }
        }
      ]
    });
  };

  const submit = async() =>{
    try {
      confirmSubmit()
      console.log(data.activeAdmission);
      let notNullFields = {};
      Object.entries(data.activeAdmission).forEach((item) => {
        if (item[1] !== null) {
          notNullFields[item[0]] = item[1];
        }
      });

      if(notNullFields.PhaseData){
        let phaseData = notNullFields.PhaseData
        phaseData = JSON.parse(phaseData)
        phaseData[phaseData.length-1].outDate = notNullFields.DateOut
        notNullFields.PhaseData = JSON.stringify(phaseData)
      }
      
      let result = await exitResident(notNullFields);
      console.log(result);
      //@ts-ignore
      setMessage("Updated");
      toast.success("Resident Exited Successfully")
      setExited(true)
    } catch (error) {
      //@ts-ignore
      setMessage("Failed to Update Resident");
    }
  }

  const doSubmit = async ({ validation, errorData }) => {
    let updatedData = { ...data };

    if (validation) {
        confirmSubmit()
    } else {
      updatedData.formStructure = errorData;
      setData(updatedData);
    }
  };

  function getDaysBetweenDates(startDate, endDate) {
    let dates = [];
    //to avoid modifying the original date
    endDate = new Date(endDate)
    const theDate = new Date(startDate);
    while (theDate < endDate) {
        dates = [...dates, new Date(theDate)];
        theDate.setDate(theDate.getDate() + 1);
    }
    dates = [...dates, endDate];
    return dates.length
}

if (exited) return <Redirect to={`/dashboard/resident/${ResID}`} />
  return (
    <div className="exitResident-Container">
      {exited && (
        <>
          <div className="Submitting-message">
            <h1 className="display-1">Resident successfully Exited!</h1>
          </div>
        </>
      )}
      {!exited && (
        <>
      <div className="createResident-Container-headSection">
        <h2 className="primary">
          {data.resident.ResFirstName
            ? `Exit Resident - ${
                data.resident.ResFirstName + " " + data.resident.ResLastName
              }`
            : "Loading..."}
        </h2>
        {daysHere  !== 0 &&  (
          <div className="CreateForm-Session-Counter light-text">
            <h1>{daysHere}</h1>
            <p>Days in Program</p>
          </div>
        )}
      </div>
      {data.resFound === 2 && (
        <div className="exitResident-FormContainer">
          {/* @ts-ignore */}
          <Form
            data={data.formStructure}
            onChange={handleChange}
            submit={doSubmit}
            buttonLabel={"Exit Resident"}
          ></Form>
          {message && <div className="updateResident-footer">{message}</div>}
        </div>
      )}
      </>
      )}
    </div>
  );
};

export default UpdateResident;
