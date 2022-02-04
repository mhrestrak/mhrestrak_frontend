import React, { useState } from "react";
import Joi from "joi-browser";

import AdmissionSection from "../common/admissionCommonComponents/admissionSection";
import { getAdmissionobject } from "../../utils/admissionObject";
import { prepAdmissionData } from "../../utils/prepAdmissionData";
import { Redirect } from "react-router-dom";
import { CreateResAdmission } from "../../services/residentService";
// import { prepData } from "../../utils/prepData";
// import { CreateResidentWithSections } from "../../services/residentService";

const CreateAdmission = () => {
  const [ResID, setResID] = useState(window.location.pathname.split("/")[3]);
  const [data, setData] = useState(getAdmissionobject());
  const [formData, setFormData] = useState({
    IsRestricted: true,
    IsApprovedPartner: false,
    CanSelfSignout: false,
  });
  const [activeSession, setActiiveSession] = useState("create");

  const sessions = [
    { name: "admission", label: "Admission" },
    { name: "legal", label: "Legal Cases" },
    { name: "success", label: "Submitted Successfully!" },
  ];

  // const [activeSession, setActiiveSession] = useState("admission");

  // const [formData, setFormData] = useState({
  //   legal: [],
  // });

  const handleChange = (json, name) => {
    let itemName = name.split("_");

    let item = data[parseInt(itemName[1], 10)][parseInt(itemName[2], 10)];

    let updatedData = [...data];
    let updatedFormData = { ...formData };

    if (item.type === "input" || item.type === "select") {
      item.value =
        json.currentTarget.value === "" ? undefined : json.currentTarget.value;
      updatedFormData[itemName[3]] =
        json.currentTarget.value === "" ? undefined : json.currentTarget.value;
    } else if (item.type === "checkbox") {
      item.value = json.target.checked;
      updatedFormData[itemName[3]] = json.target.checked;
    } else if (item.type === "date" || item.type === "yesNo") {
      item.value = json;
      updatedFormData[itemName[3]] = json;
    }

    const errorMessage = validateProperty(item);
    if (errorMessage) item.error = errorMessage;
    else item.error = undefined;

    updatedData[parseInt(itemName[1], 10)][parseInt(itemName[2], 10)] = item;

    setFormData(updatedFormData);
    setData(updatedData);
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
    let update = () => {
      let updatedFormData = { ...formData };
      data[activeSession].forEach((row) => {
        row.forEach((item) => {
          let sID = item.name.split("_")[0];
          updatedFormData[sID === "church" ? "basic" : sID][
            item.name.split("_")[3]
          ] = item.value;
        });
      });
      setFormData(updatedFormData);
    };

    if (activeSession === "basic") {
      if (await validate()) {
        update();
        if (data["basic"][0][2].value) {
          setActiiveSession("church");
        } else if (data["basic"][0][3].value) {
          setActiiveSession("family");
        } else {
          setActiiveSession("contact");
        }
      }
    } else if (activeSession === "church") {
      if (data["basic"][0][3].value) {
        setActiiveSession("family");
      } else {
        setActiiveSession("contact");
      }
    } else if (activeSession === "family") {
      setActiiveSession("contact");
    } else if (activeSession === "contact") {
      if (await validate()) {
        update();
        setActiiveSession("notes");
      }
    } else if (activeSession === "notes") {
      if (await validate()) {
        update();
        setActiiveSession("education");
      }
    } else if (activeSession === "education") {
      setActiiveSession("employment");
    } else if (activeSession === "employment") {
      if (await validate()) {
        update();
        setActiiveSession("drugs");
      }
    } else if (activeSession === "drugs") {
      setActiiveSession("legal");
    } else if (activeSession === "legal") {
      setActiiveSession("finances");
    } else if (activeSession === "finances") {
      setActiiveSession("medical");
    } else if (activeSession === "medical") {
      setActiiveSession("medication");
    } else {
      // console.log("not configured");
    }
  };

  const previousSession = () => {
    let f;
    sessions.forEach((session, i) => {
      if (session.name === activeSession) {
        if (!f) {
          f = true;
          if (activeSession === "family") {
            if (data["basic"][0][2].value) {
              setActiiveSession("church");
            } else {
              setActiiveSession("basic");
            }
          } else if (activeSession === "contact") {
            if (data["basic"][0][3].value) {
              setActiiveSession("family");
            } else if (data["basic"][0][2].value) {
              setActiiveSession("church");
            } else {
              setActiiveSession("basic");
            }
          } else {
            setActiiveSession(sessions[i - 1].name);
          }
        }
      }
    });
  };

  const doSubmit = async () => {
    let update = () => {
      let updatedFormData = { ...formData };
      data.forEach((row) => {
        row.forEach((item) => {
          let sID = item.name.split("_")[0];
          updatedFormData[sID[3]] = item.value;
        });
      });
      setFormData(updatedFormData);
    };
    if (validate()) {
      update();
      setActiiveSession("submitting");
      let prepedData = prepAdmissionData({ ...formData }, ResID);
      let result = await CreateResAdmission(prepedData);
      setActiiveSession("success");
    }
  };

  if (!ResID) return <Redirect to="/dashboard" />;
  // if (activeSession === "success") return <Redirect to="/dashboard" />;

  return (
    <div className="createResident-Container">
      <div className="createResident-Container-headSection">
        <h2 className="primary">Admission</h2>
      </div>
      {activeSession === "create" && (
        <>
          <AdmissionSection
            data={data}
            onChange={handleChange}
            submitWholeForm={doSubmit}
          />
        </>
      )}
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
    </div>
  );
};

export default CreateAdmission;
