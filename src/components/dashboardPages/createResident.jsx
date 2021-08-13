import React, { Component } from "react";
import Joi, { errors } from "joi-browser";
import { toast } from "react-toastify";
import Input from "../common/input";
import CheckBox from "../common/checkbox";
import Date from "../common/date";
import Select from "../common/select";
import { Country, State, City } from "country-state-city";
import { getStatesOfCountry } from "country-state-city/dist/lib/state";

class CreateResident extends Component {
  state = {
    data: {},
    sessions: [
      { name: "basic", label: "Basic Info", parts: 3 },
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
    ],
    activeSession: "basic",
    part: 1,
    countries: [],
    states: [],
    cities: [],
    errors: {},
  };

  componentDidMount() {
    let countries = Country.getAllCountries();
    this.setState({ countries });
  }

  getStatesOfCountry = (countryId) => {
    let country = this.state.data[countryId];
    if (country) {
      let selectedCountry = this.state.countries.filter(
        (c) => c.name === country
      );
      if (selectedCountry.length > 0) {
        let states = State.getStatesOfCountry(selectedCountry[0].isoCode);
        return states.map((country) => ({
          _id: country.isoCode,
          name: country.name,
        }));
      } else {
        return [];
      }
    } else {
      return [];
    }
  };

  getCitiesOfState = (stateId) => {
    let state = this.state.data[stateId];
    if (state) {
      let selectedState = State.getAllStates().filter((s) => s.name === state);
      if (selectedState.length > 0) {
        let cities = City.getCitiesOfState(
          selectedState[0].countryCode,
          selectedState[0].isoCode
        );
        cities = cities.map((state, i) => ({
          _id: i.toString(),
          name: state.name,
        }));
        return cities;
      } else {
        return [];
      }
    } else {
      return [];
    }
  };

  doSubmit = async () => {};

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input, target }) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    // const errorMessage = this.validateProperty(input);
    // if (errorMessage) errors[input.name] = errorMessage;
    // else delete errors[input.name];
    if (
      input.type === "text" ||
      input.type === "number" ||
      input.type === "select-one"
    ) {
      data[input.name] = input.value;
    } else if (input.type === "checkbox") {
      data[input.id] = target.checked;
    }
    this.setState({ data, errors });
  };

  handleDOBChange = (date) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    // const errorMessage = this.validateProperty(input);
    // if (errorMessage) errors[input.name] = errorMessage;
    // else delete errors[input.name];
    data["basic_ResBirthDate"] = date;
    this.setState({ data, errors });
  };

  //session Switches

  nextSession = () => {};

  previousSession = () => {};

  render() {
    let categoryIndex = 1;
    let currentSession = this.state.sessions.filter((session, i) => {
      if (session.name === this.state.activeSession) {
        categoryIndex = i + 1;
        return true;
      }
      return false;
    })[0];
    console.log(this.state.data);
    return (
      <div className="createResident-Container">
        <div className="createResident-Container-headSection">
          <h2 className="primary">{`Resident ${currentSession.label}`}</h2>
          <div className="CreateForm-Session-Counter light-text">
            <h5>Category</h5>
            <h3>{`${categoryIndex}/11`}</h3>
          </div>
        </div>
        {this.state.activeSession === "basic" && this.state.part === 1 && (
          <div className="createResident-Container-formSection">
            <div className="createResident-Container-formSection-row">
              <div className="createResident-Container-formSection-rowItem grow2">
                <Input
                  type={"text"}
                  onChange={this.handleChange}
                  name={"basic_ResPictureKey"}
                  label={"Image Link"}
                  value={
                    this.state.data.basic_ResPictureKey
                      ? this.state.data.basic_ResPictureKey
                      : ""
                  }
                  showLabel={true}
                />
              </div>
              <div className="createResident-Container-formSection-rowItem grow1">
                <CheckBox
                  onChange={this.handleChange}
                  name={"basic_IsVeteran"}
                  label={"Is Veteeran?"}
                  value={this.state.data.basic_IsVeteran}
                />
              </div>
              <div className="createResident-Container-formSection-rowItem grow1">
                <CheckBox
                  onChange={this.handleChange}
                  name={"basic_IsChurchAttender"}
                  label={"Church Attender?"}
                  value={this.state.data.IsChurchAttender}
                />
              </div>
              <div className="createResident-Container-formSection-rowItem grow1">
                <CheckBox
                  onChange={this.handleChange}
                  name={"basic_HasChildren"}
                  label={"Has Children?"}
                  checked={this.state.data.HasChildren}
                />
              </div>
            </div>
            <div className="createResident-Container-formSection-row">
              <div className="createResident-Container-formSection-rowItem grow1">
                <Input
                  type={"text"}
                  onChange={this.handleChange}
                  name={"basic_ResFirstName"}
                  label={"Resident First Name"}
                  value={
                    this.state.data.basic_ResFirstName
                      ? this.state.data.basic_ResFirstName
                      : ""
                  }
                  showLabel={true}
                />
              </div>
              <div className="createResident-Container-formSection-rowItem grow1">
                <Input
                  type={"text"}
                  onChange={this.handleChange}
                  name={"basic_ResMiddleName"}
                  label={"Resident Middle Name"}
                  value={
                    this.state.data.basic_ResMiddleName
                      ? this.state.data.basic_ResMiddleName
                      : ""
                  }
                  showLabel={true}
                />
              </div>
              <div className="createResident-Container-formSection-rowItem grow1">
                <Input
                  type={"text"}
                  onChange={this.handleChange}
                  name={"basic_ResLastName"}
                  label={"Resident Last Name"}
                  value={
                    this.state.data.basic_ResLastName
                      ? this.state.data.basic_ResLastName
                      : ""
                  }
                  showLabel={true}
                />
              </div>
            </div>
            <div className="createResident-Container-formSection-row">
              <div className="createResident-Container-formSection-rowItem grow1">
                <Input
                  type={"text"}
                  onChange={this.handleChange}
                  name={"basic_SSN"}
                  label={"SSN"}
                  value={
                    this.state.data.basic_SSN ? this.state.data.basic_SSN : ""
                  }
                  showLabel={true}
                />
              </div>
              <div className="createResident-Container-formSection-rowItem grow1">
                <Input
                  type={"text"}
                  onChange={this.handleChange}
                  name={"basic_PSNumber"}
                  label={"PSNumber"}
                  value={
                    this.state.data.basic_PSNumber
                      ? this.state.data.basic_PSNumber
                      : ""
                  }
                  showLabel={true}
                />
              </div>
            </div>
            <div className="createResident-Container-formSection-row">
              <div className="createResident-Container-formSection-rowItem grow1">
                <Input
                  type={"text"}
                  onChange={this.handleChange}
                  name={"basic_ResEmailAddr"}
                  label={"Email Address"}
                  value={
                    this.state.data.basic_ResEmailAddr
                      ? this.state.data.basic_ResEmailAddr
                      : ""
                  }
                  showLabel={true}
                  error={this.state.errors["basic_ResEmailAddr"]}
                />
              </div>
              <div className="createResident-Container-formSection-rowItem grow1">
                <Date
                  onChange={this.handleDOBChange}
                  name={"basic_ResBirthDate"}
                  label={"Date of birth"}
                  value={
                    this.state.data.basic_ResBirthDate
                      ? this.state.data.basic_ResBirthDate
                      : null
                  }
                  error={this.state.errors["basic_ResBirthDate"]}
                ></Date>
              </div>
            </div>
            <div className="createResident-Container-formSection-row">
              <div className="createResident-Container-formSection-rowItem grow1">
                <Input
                  type={"number"}
                  onChange={this.handleChange}
                  name={"basic_ResPhoneNumber"}
                  label={"Phone number"}
                  value={
                    this.state.data.basic_ResPhoneNumber
                      ? this.state.data.basic_ResPhoneNumber
                      : ""
                  }
                  showLabel={true}
                  error={this.state.errors["basic_ResPhoneNumber"]}
                />
              </div>
              <div className="createResident-Container-formSection-rowItem grow1">
                <Input
                  type={"text"}
                  onChange={this.handleChange}
                  name={"basic_ResAddress1"}
                  label={"Resident Address"}
                  value={
                    this.state.data.basic_ResAddress1
                      ? this.state.data.basic_ResAddress1
                      : ""
                  }
                  showLabel={true}
                  error={this.state.errors["basic_ResAddress1"]}
                />
              </div>
            </div>
            <div className="createResident-Container-formSection-row">
              <div className="createResident-Container-formSection-rowItem grow1">
                <Select
                  onChange={this.handleChange}
                  name={"basic_WhereRaisedCountry"}
                  label={"Where Raised Country"}
                  options={this.state.countries.map((country) => ({
                    _id: country.isoCode,
                    name: country.name,
                  }))}
                  value={
                    this.state.data.basic_WhereRaisedCountry
                      ? this.state.data.basic_WhereRaisedCountry
                      : undefined
                  }
                  error={this.state.errors["basic_WhereRaisedCountry"]}
                ></Select>
              </div>
              <div className="createResident-Container-formSection-rowItem grow1">
                <Select
                  onChange={this.handleChange}
                  name={"basic_WhereRaisedState"}
                  label={"Where Raised State"}
                  options={this.getStatesOfCountry("basic_WhereRaisedCountry")}
                  value={
                    this.state.data.basic_WhereRaisedState
                      ? this.state.data.basic_WhereRaisedState
                      : undefined
                  }
                  error={this.state.errors["basic_WhereRaisedState"]}
                ></Select>
              </div>
              <div className="createResident-Container-formSection-rowItem grow1">
                <Select
                  onChange={this.handleChange}
                  name={"basic_WhereRaisedCity"}
                  label={"Where Raised City"}
                  options={this.getCitiesOfState("basic_WhereRaisedState")}
                  value={
                    this.state.data.basic_WhereRaisedCity
                      ? this.state.data.basic_WhereRaisedCity
                      : undefined
                  }
                  error={this.state.errors["basic_WhereRaisedCity"]}
                ></Select>
              </div>
            </div>
            <div className="createResident-Container-endSection">
              <h4 className="form-pagination">1/3</h4>
            </div>
          </div>
        )}
        {this.state.activeSession === "basic" && this.state.part === 2 && (
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
        )}
        <div className="createResident-Container-endSection">
          <div className="createResident-Container-formSection-rowItem-nextButton">
            <button
              className="formSection-rowItem-nextButton button"
              onClick={this.previousSession}
            >
              Previous
            </button>
            <button
              className="formSection-rowItem-nextButton button"
              onClick={this.nextSession}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateResident;
