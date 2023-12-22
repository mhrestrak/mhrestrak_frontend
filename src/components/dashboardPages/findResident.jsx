import React, { Component } from "react";
import Input from "../common/input";
import { findResident } from "../../services/residentService";
import { Link } from "react-router-dom";
import uniqId from "uniqid";
import Select from "../../components/common/select";
class FindResident extends Component {
  state = {
    query: "",
    filter : 1,
    sort : 1,
    search: false,
    res: [],
  };

  async componentDidMount() {
    try {
      let { data } = await findResident();
      console.log(data)
      // if (this.state.data.ssn && !this.state.data.name) {s
      //   console.log("filter");
      //   data = data.filter((res) => res.IsActive !== true);
      // }
      this.setState({ res: data, search: false });
    } catch (ex) {
      console.log(ex);
      // toast.error(ex.message);
    }
  }

  handleChange = ({ currentTarget: input }) => {
    let query = this.state.query;
    query = input.value;
    this.setState({ query, search: false });
  };

  handleFilterChange = ({ currentTarget: input }) => {
    let filter = input.value;
    this.setState({ filter, search: false });
    this.handleSubmit(filter)
  };

  handleSortChange = ({ currentTarget: input }) => {
    let sort = Number(input.value);
    let data = this.sortData(this.state.res, sort)
    this.setState({sort,res: data });
  };

  sortData = (data, sort) =>{
    if(this.state.sort || this.state.sort === 0){
      switch (sort) {
        case 2: // A-Z FirstName
        console.log(3)
          return data.sort((a, b) => a.ResFirstName.localeCompare(b.ResFirstName));
        case 3: // Z-A FirstName
        console.log(4)
          return data.sort((a, b) => b.ResFirstName.localeCompare(a.ResFirstName));
        case 4: // A-Z LastName
        console.log(3)
          return data.sort((a, b) => a.ResLastName.localeCompare(b.ResLastName));
        case 5: // Z-A LastName
        console.log(4)
          return data.sort((a, b) => b.ResLastName.localeCompare(a.ResLastName));
        default:
          console.log(5)
          return data;
      }
    }else{
      return data
    }
  }

  handleSubmit = async (filter) => {
    try {
      let { data } = await findResident(this.state.query, (filter ? filter :this.state.filter));
      // if (this.state.data.ssn && !this.state.data.name) {
      //   console.log("filter");
      //   data = data.filter((res) => res.IsActive !== true);
      // }
      data = this.sortData(data, this.state.sort)
      this.setState({ res: data, search: true });
    } catch (ex) {
      console.log(ex);
      // toast.error(ex.message);
    }
  };

  handleReset = async () => {
    try {
      let { data } = await findResident();
      this.setState({ res: data, search: false ,query: "", sort :1});
    } catch (ex) {
      console.log(ex);
    }
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
          {/* <div className="findResident-Container-searchSection-item"> */}
            {/* @ts-ignore */}
            <Input
              type={"text"}
              onChange={this.handleChange}
              name={"query"}
              label={"Search SSN/Name"}
              value={this.state.query}
            />
            <div className="findResidentButtons">
            <button className="bFlex"  onClick={() => this.handleSubmit()}>
              Search
            </button>
            <button className="bFlex leftMargin blackButton" onClick={this.handleReset}>
              Reset
            </button>
            </div>
            <div className="grow1 filterDropdown">
              <Select 
                label="Resident Status" 
                options={[
                  {name : "All", value : 1},
                  {name : "Active", value : 2},
                  {name : "Inactive", value : 3}
                ]}
                name="Status"
                error={null}
                onChange={this.handleFilterChange}
                value={this.state.filter}
                noClear
              />
            </div>
            <div className="grow2 filterDropdown">
              <Select 
                label="Sort" 
                options={[
                  {name : "None", value : 1},
                  {name : "First Name A-Z", value : 2},
                  {name : "First Name Z-A", value : 3},
                  {name : "Last Name A-Z", value : 4},
                  {name : "Last Name Z-A", value : 5}
                ]}
                name="Sort"
                error={null}
                onChange={this.handleSortChange}
                value={this.state.sort}
                noClear
              />
            </div>
        </div>
        {this.state.search && (
          <div className="findResident-Container-resultSection">
            <h3 className="primary">{`${this.state.res.length} ${this.state.res.length === 1 ? "Result Found" : "Results Found"}`}</h3>
            {this.state.res.length === 0 && (
                <div className="Resident-NotFound-container">
                  <i className="fa fa-user fa-4x primary" aria-hidden="true" />
                  <div className="">
                    <h4>Add a resident</h4>
                  </div>
                  <Link
                    to="/dashboard/create-resident"
                  >
                    <button className="b ">
                      create
                    </button>
                  </Link>
              </div>
            )}
          </div>
        )}
        {this.state.res.length > 0 &&
        (
          <div className="findResident-Container-data-bold">
            <div id={uniqId()} className="findResident-Container-data-header">
                <div className="findResident-Container-data-Item-ind grow2 bold">Name</div>
                <div className="findResident-Container-data-Item-ind grow1 center bold">Status</div>
                <div className="findResident-Container-data-Item-ind grow1 center bold">Phase</div>
                <div className="findResident-Container-data-Item-ind grow1 center bold">No. of Stays</div>
                <div className="findResident-Container-data-Item-ind grow1"/>
            </div>
          </div>
        )
        }
        <div className="findResident-scrollable-container">
        <div className="findResident-scrollable">
        {this.state.res.length > 0 && (
          <div className="findResident-Container-data">
            {this.state.res.map((res) => (
              <div id={uniqId()} className="findResident-Container-data-Item">
                <div className="findResident-Container-data-Item-ind grow2">
                  {res.ResLastName || res.ResFirstName
                    ? (res.ResLastName ? res.ResLastName : "") +
                      (res.ResFirstName ? " " + res.ResFirstName : "")
                    : "No Name"}
                </div>
                {res.IsActive ?
                  <div className="findResident-Container-data-Item-ind grow1 center">
                  <div className="residentView-activeBadge grow1">Active</div>
                  </div>
                  :
                  <div className="findResident-Container-data-Item-ind grow1 center">Inactive</div>
                }
                {res.IsActive ? 
                  <div className="findResident-Container-data-Item-ind grow1 center">{res.RecentPhase}</div> :
                  <div className="findResident-Container-data-Item-ind grow1 center">-</div>
                }
                <div className="findResident-Container-data-Item-ind grow1 center">
                  {res.admissions ? res.admissions : "-"}
                </div>
                <div className="findResident-Container-data-Item-ind grow1">
                <Link
                      to={`/dashboard/resident/${res.ResID}`}
                      className="nav-item"
                    >
                <button className="b">
                  Manage
                </button>
                    </Link>
                    </div>
                {/* {!res.IsActive && res.ResID ? (
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
                  // <div className="findResident-Container-data-Item-ind grow2 flexEnd"></div>
                  <div className="findResident-Container-data-Item-ind grow1 flexEnd">
                    <Link
                      to={`/dashboard/exit/${res.ResID}`}
                      className="nav-item"
                    >
                      <button className="exit-button">Exit Resident</button>
                    </Link>
                  </div>
                )} */}
                {/* {res.IsActive && res.ResID && (
                  <div className="findResident-Container-data-Item-ind grow1 flexEnd">
                    <Link
                      to={`/dashboard/update-resident/${res.ResID}`}
                      className="nav-item"
                    >
                      <button className="update-button " onClick={() => {}}>
                        Update
                      </button>
                    </Link>
                  </div>
                )} */}
              </div>
            ))}
          </div>
        )}
        </div>
        </div>
      </div>
    );
  }
}

export default FindResident;
