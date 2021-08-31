import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
// import { toast } from "react-toastify";
import {
  getCountries,
  getStatesOfCountry,
  getCitiesOfState,
} from "../../services/dropdownLocationService";

import AdmissionSection from "../common/admissionCommonComponents/admissionSection";
import { getList } from "../../services/listService";
import { getobject } from "../../utils/residentObject";
import MultiItemGenerator from "../common/admissionCommonComponents/multipleItemGenerator";
import { getFamilyObject } from "../../utils/familyObject";
import { getEducationObject } from "../../utils/educationObject";
import { getDrugsObject } from "../../utils/drugsObject";
import { getLegalobject } from "../../utils/legalCasesObject";
import { getMedicalObject } from "../../utils/medicalObject";
import { getFinanceObject } from "../../utils/financeObject";
import { getMedicationObject } from "../../utils/medicationObject";
import { prepData } from "../../utils/prepData";
import {
  CreateResidentWithSections,
  findResident,
} from "../../services/residentService";
import { Link } from "react-router-dom";
const CreateResident = () => {
  const sessions = [
    { name: "basic", label: "Basic Info" },
    { name: "church", label: "Church" },
    { name: "family", label: "Family Info" },
    { name: "contact", label: "Emergency Contact" },
    { name: "notes", label: "Notes" },
    { name: "education", label: "Education Info" },
    { name: "employment", label: "Employment Info" },
    { name: "drugs", label: "Drugs Info" },
    { name: "legal", label: "Legal Cases" },
    { name: "finances", label: "Finances" },
    { name: "medical", label: "Medical Info" },
    { name: "medication", label: "Medication  Info" },
    { name: "medication", label: "Medication  Info" },
    { name: "submitting", label: "Submitting" },
    { name: "success", label: "Submitted Successfully!" },
  ];

  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    basic: {},
    family: [],
    contact: {},
    notes: {},
    education: [],
    employment: {},
    drugs: [],
    legal: [],
    finances: [],
    medical: [],
    medication: [],
  });
  const [activeSession, setActiiveSession] = useState("basic");
  const [activeSessionPart, setActiveSessionPart] = useState(1);

  const [data, setData] = useState(getobject());

  // state = {
  //   data: {},
  //   activeSession: "basic",
  //   part: 1,
  //   countries: [],
  //   states: [],
  //   cities: [],
  //   errors: {},
  // };

  useEffect(async () => {
    let countries = getCountries();
    setCountries(countries);
    let lists = await getList(7);
    let notCategories = await getList(4);
    let data1 = { ...data };
    data1.church[1][1].options = lists;
    data1.notes[0][0].options = notCategories;
    data1.basic[6][0].options = getStatesOfCountry("United States");
    setData(data1);
  }, []);

  const handleChange = (json, name) => {
    let itemName = name.split("_");

    let item =
      data[itemName[0]][parseInt(itemName[1], 10)][parseInt(itemName[2], 10)];

    let updatedData = { ...data };
    let updatedFormData = { ...formData };

    if (item.type === "input" || item.type === "select") {
      item.value =
        json.currentTarget.value === "" ? undefined : json.currentTarget.value;
      updatedFormData[itemName[0] === "church" ? "basic" : itemName[0]][
        itemName[3]
      ] =
        json.currentTarget.value === "" ? undefined : json.currentTarget.value;
    } else if (item.type === "checkbox") {
      console.log("ran");
      item.value = json.target.checked;
      updatedFormData[itemName[0] === "church" ? "basic" : itemName[0]][
        itemName[3]
      ] = json.target.checked;
    } else if (item.type === "date" || item.type === "yesNo") {
      item.value = json;
      updatedFormData[itemName[0] === "church" ? "basic" : itemName[0]][
        itemName[3]
      ] = json;
    }

    const errorMessage = validateProperty(item);
    if (errorMessage) item.error = errorMessage;
    else item.error = undefined;

    if (itemName[3].endsWith("Country")) {
      let states = getStatesOfCountry(json.currentTarget.value);
      updatedData[itemName[0]][parseInt(itemName[1], 10)][
        parseInt(itemName[2], 10) + 1
      ]["options"] = states;
    }

    if (itemName[3].endsWith("State")) {
      let cities = getCitiesOfState(json.currentTarget.value);
      updatedData[itemName[0]][parseInt(itemName[1], 10)][
        parseInt(itemName[2], 10) + 1
      ]["options"] = cities;
    }

    updatedData[itemName[0]][parseInt(itemName[1], 10)][
      parseInt(itemName[2], 10)
    ] = item;

    setFormData(updatedFormData);
    setData(updatedData);
  };

  const setmultiItems = (items, section) => {
    let updatedFormData = { ...formData };
    updatedFormData[section] = items;
    setFormData(updatedFormData);
  };

  //====================================== Validations ========================================

  const validate = async () => {
    const options = { abortEarly: false };
    let schema = {};
    let validationData = {};
    let data1 = { ...data };
    data[activeSession].forEach((row) => {
      row.forEach((item) => {
        schema[item.label] = item.schema;
        validationData[item.label] = item.value;
      });
    });

    const { error } = Joi.validate(validationData, schema, options);

    if (!error) {
      if (activeSession === "basic") {
        console.log(1);
        let SSNValidation = await findResident(data.basic[2][0].value);
        console.log(2);
        console.log(SSNValidation);
        if (SSNValidation.data) {
          console.log(3);
          if (SSNValidation.data.length > 0) {
            console.log(4);
            data1[activeSession][2][0].error = "Res With SSN Exists";
            setData(data1);
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      } else {
        return true;
      }
    }

    data[activeSession].forEach((row, rowI) => {
      row.forEach((item, itemI) => {
        error.details.forEach((er) => {
          if (er.path[0] === item.label) {
            data1[activeSession][rowI][itemI].error = er.message;
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
      console.log("not configured");
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
    setActiiveSession("submitting");
    let prepedData = prepData({ ...formData });
    let result = await CreateResidentWithSections(prepedData);
    if (result.ResID) {
      console.log("success after done");
      console.log(result);
      setActiiveSession("success");
    } else {
      console.log(result);
    }
  };

  let categoryIndex = 1;
  let currentSession = sessions.filter((session, i) => {
    if (session.name === activeSession) {
      categoryIndex = i + 1;
      return true;
    }
    return false;
  })[0];
  console.log("formData", formData);
  console.log("data", data);
  console.log("---");

  return (
    <div className="createResident-Container">
      <div className="createResident-Container-headSection">
        {activeSession !== "submitting" && activeSession !== "success" && (
          <h2 className="primary">{`Resident ${currentSession.label}`}</h2>
        )}
        {activeSession !== "submitting" && activeSession !== "success" && (
          <div className="CreateForm-Session-Counter light-text">
            <h5>Category</h5>
            <h3>{`${categoryIndex}/12`}</h3>
          </div>
        )}
      </div>
      {activeSession === "submitting" && (
        <div className="Submitting-message">
          <h1 className="display-2">Submitting data</h1>
          <h3 className="primary">Do not refresh the page!</h3>
        </div>
      )}
      {activeSession === "success" && (
        <>
          <div className="Submitting-message">
            <h1 className="display-1">Congratulations!</h1>
            <h3 className="">New resident has been created successfully</h3>
          </div>
          <div className="findResident-Container-resultSection-Action-cases">
            <i className="fa fa-user fa-4x primary" aria-hidden="true" />
            <div className="findResident-Container-resultSection-Action-Found-text">
              <h4>{`${formData.basic.ResFirstName} ${formData.basic.ResLastName}`}</h4>
            </div>
            <Link
              to={`/dashboard/create-admission/${formData.basic.ResID}`}
              className="nav-item"
            >
              <div className="sideBar-Sections-Nav-Item">
                <h4 className="primary">Create Admission Record</h4>
              </div>
            </Link>
          </div>
        </>
      )}
      {activeSession === "basic" && (
        <>
          <AdmissionSection
            data={data.basic}
            onChange={handleChange}
            toNextSection={nextSession}
          />
        </>
      )}
      {activeSession === "church" && (
        <>
          <AdmissionSection
            data={data.church}
            onChange={handleChange}
            toNextSection={nextSession}
            toPreviousSection={previousSession}
          />
        </>
      )}
      {activeSession === "family" && (
        <MultiItemGenerator
          data={formData.family}
          setData={setmultiItems}
          sectionName={"family"}
          sectionModel={getFamilyObject()}
          toNextSection={nextSession}
          toPreviousSection={previousSession}
        />
      )}
      {activeSession === "contact" && (
        <>
          <AdmissionSection
            data={data.contact}
            onChange={handleChange}
            toNextSection={nextSession}
            toPreviousSection={previousSession}
          />
        </>
      )}
      {activeSession === "notes" && (
        <>
          <AdmissionSection
            data={data.notes}
            onChange={handleChange}
            toNextSection={nextSession}
            toPreviousSection={previousSession}
          />
        </>
      )}
      {activeSession === "education" && (
        <MultiItemGenerator
          data={formData.education}
          setData={setmultiItems}
          sectionName={"education"}
          sectionModel={getEducationObject()}
          toNextSection={nextSession}
          toPreviousSection={previousSession}
        />
      )}
      {activeSession === "employment" && (
        <>
          <AdmissionSection
            data={data.employment}
            onChange={handleChange}
            toNextSection={nextSession}
            toPreviousSection={previousSession}
          />
        </>
      )}
      {activeSession === "drugs" && (
        <MultiItemGenerator
          data={formData.drugs}
          setData={setmultiItems}
          sectionName={"drugs"}
          sectionModel={getDrugsObject()}
          toNextSection={nextSession}
          toPreviousSection={previousSession}
        />
      )}
      {activeSession === "legal" && (
        <MultiItemGenerator
          data={formData.legal}
          setData={setmultiItems}
          sectionName={"legal"}
          sectionModel={getLegalobject()}
          toNextSection={nextSession}
          toPreviousSection={previousSession}
        />
      )}
      {activeSession === "finances" && (
        <MultiItemGenerator
          data={formData.finances}
          setData={setmultiItems}
          sectionName={"finances"}
          sectionModel={getFinanceObject()}
          toNextSection={nextSession}
          toPreviousSection={previousSession}
        />
      )}
      {activeSession === "medical" && (
        <MultiItemGenerator
          data={formData.medical}
          setData={setmultiItems}
          sectionName={"medical"}
          sectionModel={getMedicalObject()}
          toNextSection={nextSession}
          toPreviousSection={previousSession}
        />
      )}
      {activeSession === "medication" && (
        <MultiItemGenerator
          data={formData.medication}
          setData={setmultiItems}
          sectionName={"medication"}
          sectionModel={getMedicationObject()}
          toPreviousSection={previousSession}
          submitWholeForm={doSubmit}
        />
      )}
    </div>
  );
};

export default CreateResident;
