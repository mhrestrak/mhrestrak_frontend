import React, { Component } from "react";
import Input from "../common/input";
import { findResident } from "../../services/residentService";
import { Link } from "react-router-dom";

class FindResident extends Component {
  state = {
    data: { ssn: "", name: "" },
    search: false,
    res: [],
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, search: false });
  };

  handleSubmit = async () => {
    try {
      console.log("sd");
      let { data } = await findResident(
        this.state.data.ssn,
        this.state.data.name
      );
      if (this.state.data.ssn && !this.state.data.name) {
        console.log("filter");
        data = data.filter((res) => res.IsActive !== true);
      }
      console.log(data);
      this.setState({ res: data, search: true });
    } catch (ex) {
      console.log(ex);
      // toast.error(ex.message);
    }
  };

  handleReset = async () => {
    this.setState({ search: false, data: { ssn: "", name: "" }, res: [] });
  };

  handleAdmissionRedirect = async () => {};

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
            {this.state.res.length > 0 ? (
              this.state.data.ssn.length > 0 && this.state.data.name === "" ? (
                <div className="findResident-Container-resultSection-Action">
                  <div className="findResident-Container-resultSection-Action-cases">
                    <i
                      className="fa fa-user fa-4x primary"
                      aria-hidden="true"
                    />
                    <div className="findResident-Container-resultSection-Action-Found-text">
                      <h4>{`${this.state.res[0].ResFirstName} ${this.state.res[0].ResLastName}`}</h4>
                      <h4 className="primary">{`${this.state.res[0].SSN}`}</h4>
                    </div>
                    <Link
                      to={`/dashboard/create-admission/${this.state.res[0].ResID}`}
                      className="nav-item"
                    >
                      <div className="sideBar-Sections-Nav-Item">
                        <h4 className="primary">Create Admission Record</h4>
                      </div>
                    </Link>
                  </div>
                </div>
              ) : (
                ""
              )
            ) : (
              <div className="findResident-Container-resultSection-Action">
                <div className="findResident-Container-resultSection-Action-cases">
                  <i className="fa fa-user fa-4x primary" aria-hidden="true" />
                  <div className="findResident-Container-resultSection-Action-Found-text">
                    <h4>Add a resident</h4>
                  </div>
                  <Link
                    to="/dashboard/create-resident"
                    className="findResident-Container-resultSection-Action-Found-userFound-b"
                  >
                    <button className="findResident-Container-resultSection-Action-Found-userFound-b b ">
                      create
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default FindResident;
