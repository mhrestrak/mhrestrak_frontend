import React, { useState } from "react";
import Joi from "joi-browser";

import AdmissionSection from "../common/admissionCommonComponents/admissionSection";
import MultiItemGenerator from "../common/admissionCommonComponents/multipleItemGenerator";
import { CreateResAdmission } from "../../services/residentService";
import { getLegalobject } from "../../utils/legalCasesObject";
import { getAdmissionobject } from "../../utils/admissionObject";
import { prepAdmissionData } from "../../utils/prepAdmissionData";
import { Redirect } from "react-router-dom";

const CreateAdmission = () => {
  const ResID = window.location.pathname.split("/")[3]
  const [activeSession, setActiiveSession] = useState("admission");
  const [data, setData] = useState(getAdmissionobject());
  const sessions = [
    { name: "admission", label: "Admission" },
    { name: "legal", label: "Legal Cases" },
    { name: "success", label: "Submitted Successfully!" },
  ];
  const [formData, setFormData] = useState({
    admission: {
      IsRestricted: true,
      IsApprovedPartner: false,
      CanSelfSignout: false,
    },
    legal: [],
  });

  const handleChange = (json, name) => {
    let itemName = name.split("_");

    let item = data[parseInt(itemName[1], 10)][parseInt(itemName[2], 10)];

    let updatedData = [...data];
    let updatedFormData = { ...formData };

    if (item.type === "input" || item.type === "select") {
      item.value =
        json.currentTarget.value === "" ? undefined : json.currentTarget.value;
      updatedFormData.admission[itemName[3]] =
        json.currentTarget.value === "" ? undefined : json.currentTarget.value;
    } else if (item.type === "checkbox") {
      item.value = json.target.checked;
      updatedFormData.admission[itemName[3]] = json.target.checked;
    } else if (item.type === "date" || item.type === "yesNo") {
      item.value = json;
      updatedFormData.admission[itemName[3]] = json;
    }

    const errorMessage = validateProperty(item);
    if (errorMessage) item.error = errorMessage;
    else item.error = undefined;

    updatedData[parseInt(itemName[1], 10)][parseInt(itemName[2], 10)] = item;

    setFormData(updatedFormData);
    setData(updatedData);
  };

  const setmultiItems = (items, section) => {
    let updatedFormData = { ...formData };
    updatedFormData[section] = items;
    setFormData(updatedFormData);
  };

  //====================================== Validations ========================================

  const validate = () => {
    const options = { abortEarly: false };
    let schema = {};
    let validationData = {};
    let data1 = [...data];
    data.forEach((row) => {
      row.forEach((item) => {
        schema[item.label] = item.schema;
        validationData[item.label] = item.value;
      });
    });

    const { error } = Joi.validate(validationData, schema, options);
    if (!error) return true;

    data.forEach((row, rowI) => {
      row.forEach((item, itemI) => {
        error.details.forEach((er) => {
          if (er.path[0] === item.label) {
            data1[rowI][itemI].error = er.message;
          }
        });
      });
    });
    setData(data1);
    return false;
  };

  const validateProperty = ({ name, value, schema, label }) => {
    // const obj = { [name.split("_")[3]]: value };
    // const schema1 = { [name.split("_")[3]]: schema };
    const obj = { [label]: value };
    const schema1 = { [label]: schema };
    const { error } = Joi.validate(obj, schema1);
    return error ? error.details[0].message : null;
  };

  //====================================== Session Switches ========================================

  const nextSession = async () => {
    if (activeSession === "admission") {
      if (await validate()) {
        setActiiveSession("legal");
      }
    }
  };

  const previousSession = () => {
    let f;
    sessions.forEach((session, i) => {
      if (session.name === activeSession) {
        if (!f) {
          f = true;
          setActiiveSession(sessions[i - 1].name);
        }
      }
    });
  };

  const doSubmit = async () => {
    setActiiveSession("submitting");
    let prepedData = prepAdmissionData(formData, ResID);
    await CreateResAdmission(prepedData);
    setActiiveSession("success");
  };

  // let categoryIndex = 1;
  // let currentSession = sessions.filter((session, i) => {
  //   if (session.name === activeSession) {
  //     categoryIndex = i + 1;
  //     return true;
  //   }
  //   return false;
  // })[0];

  if (!ResID) return <Redirect to="/dashboard" />;
  if (activeSession === "success") return <Redirect to={`/dashboard/resident/${ResID}`} />

  return (
    <div className="createResident-Container">
      <div className="createResident-Container-headSection">
        <h2 className="primary">Admission</h2>
      </div>
      {activeSession === "submitting" && (
        <div className="Submitting-message">
          <h1 className="display-2">Submitting Admission</h1>
          <h3 className="primary">Do not refresh the page!</h3>
        </div>
      )}
      {activeSession === "success" && (
        <>
          <div className="Submitting-message">
            <h1 className="display-1">Congratulations!</h1>
            <h3 className="">New admission has been created successfully</h3>
          </div>
        </>
      )}
      {activeSession === "admission" && (
        <>
          <AdmissionSection
            data={data}
            onChange={handleChange}
            toNextSection={nextSession}
          />
        </>
      )}
      {activeSession === "legal" && (
        <>
          <div className="createResident-Container-headSection">
            <h2 className="primary">{`Legal Cases`}</h2>
          </div>
          {/* @ts-ignore */}
          <MultiItemGenerator
            data={formData.legal}
            setData={setmultiItems}
            sectionName={"legal"}
            sectionModel={getLegalobject()}
            toPreviousSection={previousSession}
            submitWholeForm={doSubmit}
          />
        </>
      )}
    </div>
  );
};

export default CreateAdmission;
