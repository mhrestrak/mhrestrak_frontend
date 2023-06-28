import React, { useState } from "react";
import Joi from "joi-browser";
import { exitResident } from "../../services/residentService";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import uniqid from "uniqid";
import Form from "../common/simpleForm";
import { getGuestExitobject } from "../../utils/guestExitObject";

const ExitGuest = () => {
  const ResID = window.location.pathname.split("/")[3];
  const [activeSession, setActiiveSession] = useState("admission");
  const [data, setData] = useState(getGuestExitobject());
  const [formData, setFormData] = useState({
    guestExit: {},
  });

  const handleChange = (itemName, item1) => {
    let item = data[parseInt(itemName[1], 10)][parseInt(itemName[2], 10)];
    let updatedData = [...data];
    let updatedFormData = { ...formData };
    item.value = item1.value;

    const errorMessage = validateProperty(item);
    if (errorMessage) item.error = errorMessage;
    else item.error = undefined;

    updatedData[parseInt(itemName[1], 10)][parseInt(itemName[2], 10)] = item;
    setFormData(updatedFormData);
    setData(updatedData);
  };

  const validateProperty = ({ name, value, schema, label }) => {
    const obj = { [label]: value };
    const schema1 = { [label]: schema };
    const { error } = Joi.validate(obj, schema1);
    return error ? error.details[0].message : null;
  };

  const doSubmit = async () => {
    setActiiveSession("submitting");
    let prepedData = prepExitData(formData, ResID);
    await exitResident(prepedData.guestExit);
    toast.success("Guest Exited Successfully!");
    setActiiveSession("success");
  };

  const prepExitData = (data, resID) => {
    data.guestExit.ResID = resID;
    data.guestExit.AdmissionID = uniqid();
    return data;
  };

  if (!ResID) return <Redirect to="/dashboard" />;
  if (activeSession === "success")
    return <Redirect to={`/dashboard/resident/${ResID}`} />;

  return (
    <div className="createResident-Container">
      <div className="createResident-Container-headSection">
        <h2 className="primary">Guest Exit</h2>
      </div>
      {activeSession === "submitting" && (
        <div className="Submitting-message">
          <h1 className="display-2">Submitting Exit</h1>
          <h3 className="primary">Do not refresh the page!</h3>
        </div>
      )}
      {activeSession === "success" && (
        <>
          <div className="Submitting-message">
            <h1 className="display-1">Congratulations!</h1>
            <h3 className="">Guest has been exited successfully</h3>
          </div>
        </>
      )}
      {activeSession === "admission" && (
        <div className="exitResident-FormContainer">
          {/* @ts-ignore */}
          <Form
            data={data}
            onChange={handleChange}
            submit={doSubmit}
            buttonLabel={"Exit Guest"}
          ></Form>
        </div>
      )}
    </div>
  );
};

export default ExitGuest;
