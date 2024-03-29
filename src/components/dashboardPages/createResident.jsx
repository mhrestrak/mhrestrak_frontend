/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
// import { toast } from "react-toastify";
import {
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
import { getMedicalObject } from "../../utils/medicalObject";
// import { getFinanceObject } from "../../utils/financeObject";
import { getMedicationObject } from "../../utils/medicationObject";
import { prepData } from "../../utils/prepData";
import {
  CreateResidentWithSections,
  findResident,
} from "../../services/residentService";
import { Link } from "react-router-dom";

import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { toast } from "react-toastify";
import ResidentSearch from  "../../components/residentSearch";


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
    { name: "medical", label: "Medical Info" },
    { name: "medication", label: "Medication  Info" },
    { name: "medication", label: "Medication  Info" },
    { name: "submitting", label: "Submitting" },
    { name: "success", label: "Submitted Successfully!" },
  ];

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
  const [searchExisting, setSearchExisting] = useState(true)

  const [activeSession, setActiiveSession] = useState("basic");

  const [data, setData] = useState(getobject());

//@ts-ignore
  useEffect(() => {
    const asyncfunc = async  () =>{
      let maritalStatus = await getList(5);
      let lists = await getList(7);
      let notCategories = await getList(4);
      let AdmittedFromList = await getList(8);
      let data1 = { ...data };
      // data1.church[1][1].options = lists;
      data1.basic[3][1].options = maritalStatus;
      data1.notes[0][0].options = notCategories;
      data1.basic[4][2].options = lists;
      data1.basic[5][2].options = AdmittedFromList;
      data1.basic[6][0].options = getStatesOfCountry("United States");
      setData(data1);
    }
    asyncfunc()
  }, []);

  const handleChange = (json, name) => {
    
    let itemName = name.split("_");

    if(itemName[3] === "SSN"){
      const formatNumber = (inputValue) =>{
        let numericValue = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
        let formattedValue = "";
    
        for (let i = 0; i < numericValue.length; i++) {
            if (i === 3 || i === 5) {
                formattedValue += "-";
            }
            formattedValue += numericValue[i];
        }
    
        if (formattedValue.length > 11) {
            formattedValue = formattedValue.slice(0, 11);
        }
    
        return formattedValue;
    }
    json.currentTarget.value = formatNumber(json.currentTarget.value)
    }

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
      item.value = json.target.checked;
      updatedFormData[itemName[0] === "church" ? "basic" : itemName[0]][
        itemName[3]
      ] = json.target.checked;
    } else if (item.type === "date" || item.type === "yesNo") {
      item.value = json;
      updatedFormData[itemName[0] === "church" ? "basic" : itemName[0]][
        itemName[3]
      ] = json;
    }else if(item.type === "imagePicker") {
      if(!json.error){
        item.value = json.value;
        item.url = json.url
        updatedFormData[itemName[0] === "church" ? "basic" : itemName[0]][
          itemName[3]
        ] = json;
        console.log("Sd")
      }
    }

    const errorMessage = validateProperty(item);
    if (errorMessage) item.error = errorMessage;
    else item.error = undefined;

    if(json.error && item.type === "imagePicker"){
      item.error = json.error
    }

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
        let SSNValidation = await findResident(data.basic[2][0].value);
        if (SSNValidation.data) {
          if (SSNValidation.data.length > 0) {
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
    setActiiveSession("submitting");
    let prepedData = prepData({ ...formData });
    let result = await CreateResidentWithSections(prepedData);
    if (result.ResID) {
      toast.success("Resident Created Successfully!")
      setActiiveSession("success");
    } else {
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
  if(searchExisting) return <ResidentSearch continueToCreate={setSearchExisting}/>
  return (
    <div className="createResident-Container">
      <div className="createResident-Container-headSection">
        {activeSession !== "submitting" && activeSession !== "success" && (
          <>
          <h2 className="primary">{`Resident ${currentSession.label}`}</h2>
          {/* <div className="CreateForm-Session-Counter light-text">
            <h5>Category</h5>
            <h3>{`${categoryIndex}/12`}</h3>
          </div> */}
          <div className="createResident-progressContainer">
          <CircularProgressbarWithChildren value={(categoryIndex/12)*100} styles={buildStyles({
          pathColor: "#028482"
        })}>
        {/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
        <div style={{ fontSize: 20,fontWeight :500 }}>
          {`${categoryIndex} / 12`}
        </div>
        <div style={{ fontSize: 12, marginTop: 2, color :  "#028482"}}>
          Completed
        </div>
      </CircularProgressbarWithChildren>
          </div>
          </>
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
        //@ts-ignore
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
        //@ts-ignore
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
        //@ts-ignore
        <MultiItemGenerator
          data={formData.drugs}
          setData={setmultiItems}
          sectionName={"drugs"}
          sectionModel={getDrugsObject()}
          toNextSection={nextSession}
          toPreviousSection={previousSession}
        />
      )}
      {/* {activeSession === "finances" && (
        <MultiItemGenerator
          data={formData.finances}
          setData={setmultiItems}
          sectionName={"finances"}
          sectionModel={getFinanceObject()}
          toNextSection={nextSession}
          toPreviousSection={previousSession}
        />
      )} */}
      {activeSession === "medical" && (
        //@ts-ignore
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
        //@ts-ignore
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
