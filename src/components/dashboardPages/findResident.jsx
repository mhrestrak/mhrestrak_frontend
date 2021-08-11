import React, { Component } from "react";
import Joi, { errors } from "joi-browser";
import { toast } from "react-toastify";
import Input from "../common/input";

class FindResident extends Component {
  state = {
    data: { ssn: "", name: "" },
    search: false,
    res: [],
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleSubmit = async () => {};

  handleReset = async () => {};

  handleAdmissionRedirect = async () => {};

  handleCreateResident = async () => {};

  render() {
    return (
      <div className="findResident-Container">
        <div className="findResident-Container-searchSection">
          <div className="findResident-Container-searchSection-item">
            <Input
              type={"text"}
              onChange={this.handleChange}
              name={"ssn"}
              label={"SSN"}
              value={this.state.data.ssn}
            />
          </div>
          <div className="findResident-Container-searchSection-item">
            <Input
              type={"text"}
              onChange={this.handleChange}
              name={"name"}
              label={"Name"}
              value={this.state.data.name}
            />
          </div>
          <div className="findResident-Container-searchSection-item">
            <button className="b" onClick={this.handleSubmit}>
              Search
            </button>
          </div>
          <div className="findResident-Container-searchSection-item">
            <button className="b" onClick={this.handleReset}>
              Reset
            </button>
          </div>
        </div>
        {this.state.search && (
          <div className="findResident-Container-resultSection">
            <h3 className="primary">{`${this.state.res.length} Result Found`}</h3>
            <div className="findResident-Container-resultSection-Action">
              {this.state.res.length > 0 ? (
                this.state.data.ssn.length > 0 &&
                this.state.data.name === "" && (
                  <div className="findResident-Container-resultSection-Action-cases">
                    <i
                      className="fa fa-user fa-4x primary"
                      aria-hidden="true"
                    />
                    <div className="findResident-Container-resultSection-Action-Found-text">
                      <h4>{`${this.state.res[0].ResFisrtName} ${this.state.res[0].ResLastName}`}</h4>
                      <h4 className="primary">{`${this.state.res[0].SSN}`}</h4>
                    </div>
                    <button
                      className="findResident-Container-resultSection-Action-Found-userFound-b b "
                      onClick={this.handleAdmissionRedirect}
                    >
                      Create Admission Record
                    </button>
                  </div>
                )
              ) : (
                <div className="findResident-Container-resultSection-Action-cases">
                  <i className="fa fa-user fa-4x primary" aria-hidden="true" />
                  <div className="findResident-Container-resultSection-Action-Found-text">
                    <h4>Add a resident</h4>
                  </div>
                  <button
                    className="findResident-Container-resultSection-Action-Found-userFound-b b "
                    onClick={this.handleCreateResident}
                  >
                    create
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default FindResident;
