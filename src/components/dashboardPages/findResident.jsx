import React, { Component } from "react";
import Input from "../common/input";
import { findResident } from "../../services/residentService";
import { Link } from "react-router-dom";
import uniqId from "uniqid";
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
      let { data } = await findResident(
        this.state.data.ssn,
        this.state.data.name
      );
      // if (this.state.data.ssn && !this.state.data.name) {
      //   console.log("filter");
      //   data = data.filter((res) => res.IsActive !== true);
      // }
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

  decideAdmission = () => {
    let data1 = this.state.res.filter((res) => res.IsActive !== true);
    if (data1.length > 0) {
      return (
        <div className="findResident-Container-resultSection-Action">
          <div className="findResident-Container-resultSection-Action-cases">
            <i className="fa fa-user fa-4x primary" aria-hidden="true" />
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
      );
    } else {
      return "";
    }
  };

  render() {
    return (
      <div className="findResident-Container">
        <div className="findResident-Container-searchSection">
          <div className="findResident-Container-searchSection-item">
            {/* @ts-ignore */}
            <Input
              type={"text"}
              onChange={this.handleChange}
              name={"ssn"}
              label={"SSN"}
              value={this.state.data.ssn}
            />
          </div>
          <div className="findResident-Container-searchSection-item">
            {/* @ts-ignore */}
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
            {this.state.res.length === 0 && (
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
        {this.state.res.length > 0 && (
          <div className="findResident-Container-data">
            {this.state.res.map((res) => (
              <div id={uniqId()} className="findResident-Container-data-Item">
                <div className="findResident-Container-data-Item-ind grow3">
                  {res.ResLastName || res.ResFirstName
                    ? (res.ResLastName ? res.ResLastName : "") +
                      (res.ResFirstName ? " " + res.ResFirstName : "")
                    : "No Name"}
                </div>
                <div className="findResident-Container-data-Item-ind grow3">
                  {res.SSN}
                </div>
                {!res.IsActive && res.ResID ? (
                  <div className="findResident-Container-data-Item-ind grow1 flexEnd">
                    <Link
                      to={`/dashboard/create-admission/${res.ResID}`}
                      className="nav-item"
                    >
                      <button className="resident-button">
                        Create Admission
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="findResident-Container-data-Item-ind grow2 flexEnd"></div>
                )}
                <div className="findResident-Container-data-Item-ind grow1 flexEnd">
                <Link
                      to={`/dashboard/update-resident/${res.ResID}`}
                      className="nav-item"
                    >
                  <button className="resident-button " onClick={() => {}}>
                    Update
                  </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default FindResident;
