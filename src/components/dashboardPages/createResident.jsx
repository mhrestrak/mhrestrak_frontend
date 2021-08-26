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
  ];

  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    basic: { ResCountry: "United States" },
    family: [
      { ID: "123", ChildName: "Joshua Fernandes" },
      { ID: "1224", ChildName: "Joshua Fernandes" },
      { ID: "12234", ChildName: "Joshua Fernandes" },
    ],
    // family: [],
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
  const [activeSession, setActiiveSession] = useState("family");
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

  useEffect(() => {
    let countries = getCountries();
    setCountries(countries);
    let getListData = async () => {
      return await getList(7);
    };
    let lists = getListData();
    let data1 = { ...data };
    data1.church[1][1].options = lists;
    console.log(lists);
    setData(data1);
  }, []);

  useEffect(() => {
    let data1 = { ...data };
    data1.basic[6][0].options = countries;
    data1.basic[6][1].options = getStatesOfCountry(data1.basic[6][0].value);
    setData(data1);
  }, [countries]);

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
      item.value = json.target.checked;
      updatedFormData[itemName[0] === "church" ? "basic" : itemName[0]][
        itemName[3]
      ] = json.target.checked;
    } else if (item.type === "date") {
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

  // const doSubmit = async () => {};

  //====================================== Validations ========================================

  const validate = () => {
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
    if (!error) return true;

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

  const nextSession = () => {
    let update = () => {
      let updatedFormData = { ...formData };
      data[activeSession].forEach((row) => {
        row.forEach((item) => {
          updatedFormData[item.name.split("_")[0]][item.name.split("_")[3]] =
            item.value;
        });
      });
      setFormData(updatedFormData);
    };

    if (activeSession === "basic" || activeSession === "church") {
      if (validate()) {
        update();
        if (data["basic"][0][2].value) {
          setActiiveSession("church");
        } else if (data["basic"][0][3].value) {
          setActiiveSession("family");
        } else {
          setActiiveSession("contact");
        }
      }
    } else if (activeSession === "family") {
      setActiiveSession("contact");
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
          } else {
            setActiiveSession(sessions[i - 1].name);
          }
        }
      }
    });
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
  // console.log("data", data);
  console.log("---");

  return (
    <div className="createResident-Container">
      <div className="createResident-Container-headSection">
        <h2 className="primary">{`Resident ${currentSession.label}`}</h2>
        <div className="CreateForm-Session-Counter light-text">
          <h5>Category</h5>
          <h3>{`${categoryIndex}/11`}</h3>
        </div>
      </div>
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
    </div>
  );
};

export default CreateResident;
