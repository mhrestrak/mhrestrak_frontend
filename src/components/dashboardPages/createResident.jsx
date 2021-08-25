import React from "react";
import Joi, { errors } from "joi-browser";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";
import AdmissionSection from "../common/admissionCommonComponents/admissionSection";
import {
  getCountries,
  getStatesOfCountry,
  getCitiesOfState,
} from "../../services/dropdownLocationService";

const CreateResident = () => {
  const sessions = [
    { name: "basic", label: "Basic Info", parts: 2 },
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
  const [formData, setFormData] = useState({ ResCountry: "United States" });
  const [states, setStates] = useState([]);
  const [errors, setErrors] = useState({});
  const [render, setRender] = useState(false);
  const [activeSession, setActiiveSession] = useState("basic");
  const [activeSessionPart, setActiveSessionPart] = useState(1);

  const [data, setData] = useState({
    basic: [
      [
        {
          type: "input",
          typeName: "text",
          size: "grow2",
          name: "basic_0_0_ResPictureKey",
          label: "Image Link",
          value: "",
        },
        {
          type: "checkbox",
          size: "grow1",
          name: "basic_0_1_IsVeteran",
          label: "Is Veteeran?",
          value: false,
        },
        {
          type: "checkbox",
          size: "grow1",
          name: "basic_0_2_IsChurchAttender",
          label: "Church Attender?",
          value: false,
        },
        {
          type: "checkbox",
          size: "grow1",
          name: "basic_0_3_HasChildren",
          label: "Has Children?",
          value: false,
        },
      ],
      [
        {
          type: "input",
          size: "grow1",
          typeName: "text",
          name: "basic_1_0_ResFirstName",
          label: "Resident First Name",
          value: "",
        },
        {
          type: "input",
          size: "grow1",
          typeName: "text",
          name: "basic_1_1_ResMiddleName",
          label: "Resident Middle Name",
          value: "",
        },
        {
          type: "input",
          size: "grow1",
          typeName: "text",
          name: "basic_1_2_ResLastName",
          label: "Resident Last Name",
          value: "",
        },
      ],
      [
        {
          type: "input",
          size: "grow1",
          typeName: "text",
          name: "basic_2_0_SSN",
          label: "SSN",
          value: "",
        },
        {
          type: "input",
          size: "grow1",
          typeName: "text",
          name: "basic_2_1_PSNumber",
          label: "PSNumber",
          value: "",
        },
      ],
      [
        {
          type: "input",
          size: "grow1",
          typeName: "text",
          name: "basic_3_0_ResEmailAddr",
          label: "Email Address",
          value: "",
        },
        {
          type: "date",
          size: "grow1",
          name: "basic_3_1_ResBirthDate",
          label: "Date of birth",
          value: null,
        },
      ],
      [
        {
          type: "input",
          size: "grow1",
          typeName: "number",
          name: "basic_4_0_ResPhoneNumber",
          label: "Phone number",
          value: "",
        },
        {
          type: "input",
          size: "grow1",
          typeName: "text",
          name: "basic_4_1_ResAddress1",
          label: "Resident Address",
          value: "",
        },
      ],
      [
        {
          type: "select",
          size: "grow1",
          name: "basic_5_0_ResCountry",
          label: "Resident Country",
          options: [],
          value: "United States",
        },
        {
          type: "select",
          size: "grow1",
          name: "basic_5_1_ResState",
          label: "Resident State",
          options: [],
          value: undefined,
        },
        {
          type: "select",
          size: "grow1",
          name: "basic_5_2_ResCity",
          label: "Resident City",
          options: [],
          value: undefined,
        },
      ],
    ],
  });

  // state = {
  //   data: {},
  //   activeSession: "basic",
  //   part: 1,
  //   countries: [],
  //   states: [],
  //   cities: [],
  //   errors: {},
  // };

  const handleChange = (json, name) => {
    let itemName = name.split("_");

    let item =
      data[itemName[0]][parseInt(itemName[1], 10)][parseInt(itemName[2], 10)];

    let updatedData = { ...data };
    let updatedFormData = { ...formData };

    // const errors = { ...this.state.errors };
    // const errorMessage = this.validateProperty(input);
    // if (errorMessage) errors[input.name] = errorMessage;
    // else delete errors[input.name];

    if (item.type === "input" || item.type === "select") {
      item.value = json.currentTarget.value;
      updatedFormData[itemName[3]] = json.currentTarget.value;
    } else if (item.type === "checkbox") {
      item.value = json.target.checked;
      updatedFormData[itemName[3]] = json.target.checked;
    } else if (item.type === "date") {
      item.value = json;
      updatedFormData[itemName[3]] = json;
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

    // this.setState({ data, errors });
  };

  useEffect(() => {
    let countries = getCountries();
    setCountries(countries);
  }, []);

  useEffect(() => {
    let data1 = { ...data };
    data1.basic[5][0].options = countries;
    data1.basic[5][1].options = getStatesOfCountry(data1.basic[5][0].value);
    console.log(data1.basic[5][0].value);
    setData(data1);
  }, [countries]);

  // const doSubmit = async () => {};

  // const validate = () => {
  //   const options = { abortEarly: false };
  //   const { error } = Joi.validate(this.state.data, this.schema, options);
  //   if (!error) return null;
  //   const errors = {};

  //   for (let item of error.details) errors[item.path[0]] = item.message;

  //   return errors;
  // };

  // const validateProperty = ({ name, value }) => {
  //   const obj = { [name]: value };
  //   const schema = { [name]: this.schema[name] };
  //   const { error } = Joi.validate(obj, schema);
  //   return error ? error.details[0].message : null;
  // };

  // const handleDOBChange = (date) => {
  //   const data = { ...this.state.data };
  //   const errors = { ...this.state.errors };
  //   // const errorMessage = this.validateProperty(input);
  //   // if (errorMessage) errors[input.name] = errorMessage;
  //   // else delete errors[input.name];
  //   data["basic_ResBirthDate"] = date;
  //   this.setState({ data, errors });
  // };

  //session Switches

  const nextSession = () => {};

  const previousSession = () => {};

  let categoryIndex = 1;
  let currentSession = sessions.filter((session, i) => {
    if (session.name === activeSession) {
      categoryIndex = i + 1;
      return true;
    }
    return false;
  })[0];
  console.log("---");
  console.log(formData);
  console.log(data);

  return (
    <div className="createResident-Container">
      <div className="createResident-Container-headSection">
        <h2 className="primary">{`Resident ${currentSession.label}`}</h2>
        <div className="CreateForm-Session-Counter light-text">
          <h5>Category</h5>
          <h3>{`${categoryIndex}/11`}</h3>
        </div>
      </div>
      {activeSession === "basic" && activeSessionPart === 1 && (
        <>
          {/* <h1>asdsdasd</h1> */}
          <AdmissionSection
            data={data.basic}
            onChange={handleChange}
            paginate={"1/2"}
          />
        </>
      )}
      {/* {this.state.activeSession === "basic" && this.state.part === 2 && (
        <div className="createResident-Container-formSection">
          <div className="createResident-Container-formSection-row">
            <div className="createResident-Container-formSection-rowItem grow1">
              <Select
                onChange={this.handleChange}
                name={"basic_ResCountry"}
                label={"Resident Country"}
                options={this.state.countries.map((country) => ({
                  _id: country.isoCode,
                  name: country.name,
                }))}
                value={
                  this.state.data.basic_ResCountry
                    ? this.state.data.basic_ResCountry
                    : undefined
                }
                error={this.state.errors["basic_ResCountry"]}
              ></Select>
            </div>
            <div className="createResident-Container-formSection-rowItem grow1">
              <Select
                onChange={this.handleChange}
                name={"basic_ResState"}
                label={"Resident State"}
                options={this.getStatesOfCountry("basic_ResCountry")}
                value={
                  this.state.data.basic_ResState
                    ? this.state.data.basic_ResState
                    : undefined
                }
                error={this.state.errors["basic_ResState"]}
              ></Select>
            </div>
          </div>
          <div className="createResident-Container-formSection-row">
            <div className="createResident-Container-formSection-rowItem grow1">
              <Select
                onChange={this.handleChange}
                name={"basic_ResCity"}
                label={"Resident City"}
                options={this.getCitiesOfState("basic_ResState")}
                value={
                  this.state.data.basic_ResCity
                    ? this.state.data.basic_ResCity
                    : undefined
                }
                error={this.state.errors["basic_ResCity"]}
              ></Select>
            </div>
            <div className="createResident-Container-formSection-rowItem grow1">
              <Input
                type={"text"}
                onChange={this.handleChange}
                name={"basic_ResZipCode"}
                label={"Resident Zip Code"}
                value={
                  this.state.data.basic_ResZipCode
                    ? this.state.data.basic_ResZipCode
                    : ""
                }
                showLabel={true}
                error={this.state.errors["basic_ResZipCode"]}
              />
            </div>
          </div>
          <div className="createResident-Container-endSection">
            <h4 className="form-pagination">2/3</h4>
          </div>
        </div>
      )}
      {this.state.activeSession === "basic" && this.state.part === 3 && (
        <div className="createResident-Container-formSection">
          <div className="createResident-Container-formSection-row">
            <div className="createResident-Container-formSection-rowItem grow1">
              <Select
                onChange={this.handleChange}
                name={"basic_ResCountry"}
                label={"Resident Country"}
                options={this.state.countries.map((country) => ({
                  _id: country.isoCode,
                  name: country.name,
                }))}
                value={
                  this.state.data.basic_ResCountry
                    ? this.state.data.basic_ResCountry
                    : undefined
                }
                error={this.state.errors["basic_ResCountry"]}
              ></Select>
            </div>
            <div className="createResident-Container-formSection-rowItem grow1">
              <Select
                onChange={this.handleChange}
                name={"basic_ResState"}
                label={"Resident State"}
                options={this.getStatesOfCountry("basic_ResCountry")}
                value={
                  this.state.data.basic_ResState
                    ? this.state.data.basic_ResState
                    : undefined
                }
                error={this.state.errors["basic_ResState"]}
              ></Select>
            </div>
          </div>
          <div className="createResident-Container-formSection-row">
            <div className="createResident-Container-formSection-rowItem grow1">
              <Select
                onChange={this.handleChange}
                name={"basic_ResCity"}
                label={"Resident City"}
                options={this.getCitiesOfState("basic_ResState")}
                value={
                  this.state.data.basic_ResCity
                    ? this.state.data.basic_ResCity
                    : undefined
                }
                error={this.state.errors["basic_ResCity"]}
              ></Select>
            </div>
            <div className="createResident-Container-formSection-rowItem grow1">
              <Input
                type={"text"}
                onChange={this.handleChange}
                name={"basic_ResZipCode"}
                label={"Resident Zip Code"}
                value={
                  this.state.data.basic_ResZipCode
                    ? this.state.data.basic_ResZipCode
                    : ""
                }
                showLabel={true}
                error={this.state.errors["basic_ResZipCode"]}
              />
            </div>
          </div>
          <div className="createResident-Container-endSection">
            <h4 className="form-pagination">3/3</h4>
          </div>
          <div className="createResident-Container-endSection">
            <div className="createResident-Container-formSection-rowItem-nextButton">
              <button
                className="formSection-rowItem-nextButton button"
                onClick={this.toBasic2}
              >
                Previous
              </button>
              <button
                className="formSection-rowItem-nextButton button"
                onClick={this.tofamily}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )} */}
      <div className="createResident-Container-endSection">
        <div className="createResident-Container-formSection-rowItem-nextButton">
          <button
            className="formSection-rowItem-nextButton button"
            onClick={previousSession}
          >
            Previous
          </button>
          <button
            className="formSection-rowItem-nextButton b"
            onClick={nextSession}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateResident;
