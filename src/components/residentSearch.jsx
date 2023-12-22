import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Input from "./common/input";
import uniqId from "uniqid";
import { findResident } from "../services/residentService";
import { Link } from "react-router-dom/cjs/react-router-dom";

const ResidentSearch = (props) => {
  const [searchQuery, setSearchQuery] = useState();
  const [searchResult, setSearchResult] = useState(undefined);

  //   const handleChange = (data) => {
  //     setSearchQuery(data.target.value)
  //   };

  const handleSubmit = async () => {
    try {
      if (searchQuery === "") return setSearchResult();
      let { data } = await findResident(searchQuery);
      // if (this.state.data.ssn && !this.state.data.name) {
      //   console.log("filter");
      //   data = data.filter((res) => res.IsActive !== true);
      // }
      setSearchResult(data);
    } catch (ex) {
      console.log(ex);
      // toast.error(ex.message);
    }
  };

  return (
    <div className="findResident-Container">
      <div className="searchResident-Container">
        <h2 className="primary marginVertical">
          Search for Existing Residents
        </h2>
        <div className="searchResident-Container-searchSection">
          {/* <div className="findResident-Container-searchSection-item"> */}
          {/* @ts-ignore */}
          <div className="searchResident-Container-searchSection-searchBox">
            <Input
              type={"text"}
              onChange={(data) => setSearchQuery(data.target.value)}
              name={"query"}
              label={"Search SSN/Name"}
            />
          </div>
          <div className="searchResident-Container-searchSection-searchButton">
            <button className="b" onClick={() => handleSubmit()}>
              Search
            </button>
          </div>
        </div>
        {searchResult?.length === 0 && (
          <div className="findResident-Container-resultSection">
            <h4 className="primary">No Results Found</h4>

            <div className="searchResident-NotFound-container marginVertical">
              <i className="fa fa-user fa-4x primary" aria-hidden="true" />
              <div className="">
                <h4>Add a resident</h4>
              </div>
              <button className="b" onClick={ () => props.continueToCreate()}>create</button>
            </div>
          </div>
        )}
        {searchResult?.length > 0 && (
          <div className="searchResident-scrollable">
            <div className="searchResident-Container-data">
              {searchResult.map((res) => (
                <div id={uniqId()} className="findResident-Container-data-Item">
                  <div className="findResident-Container-data-Item-ind grow2">
                    {res.ResLastName || res.ResFirstName
                      ? (res.ResLastName ? res.ResLastName : "") +
                        (res.ResFirstName ? " " + res.ResFirstName : "")
                      : "No Name"}
                  </div>
                  <div className="findResident-Container-data-Item-ind grow2 center">
                    {res.SSN ? res.SSN : "-"}
                  </div>
                  <div className="findResident-Container-data-Item-ind grow1">
                    <Link
                      to={`/dashboard/resident/${res.ResID}`}
                      className="nav-item"
                    >
                      <button className="b">View</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResidentSearch;
