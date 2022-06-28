import React from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { getActiveResidents } from "../../services/residentService";

function Reports(props) {
  const [reports, setReports] = useState({
    RbN: {
      data: [],
      created: false,
      fileName: "Resident-by-Name.csv",
    },
    RbP: {
      data: [],
      created: false,
      fileName: "Resident-by-Phase.csv",
    },
    RbR: {
      data: [],
      created: false,
      fileName: "Resident-by-Room.csv",
    },
  });
  const [message, setMessage] = useState();

  const residentByName = async () => {
    setMessage(undefined);
    try {
      let JSONData = await getData();
      JSONData.sort((a, b) =>
        a.Name.toLowerCase() > b.Name.toLowerCase()
          ? 1
          : b.Name.toLowerCase() > a.Name.toLowerCase()
          ? -1
          : 0
      );
      let updatedReports = { ...reports };
      updatedReports.RbN.data = JSONData;
      updatedReports.RbN.created = true;
      setReports(updatedReports);
    } catch (error) {
      //@ts-ignore
      setMessage("Report could not be generated! Try again later");
    }
  };

  const residentByPhase = async () => {
    setMessage(undefined);
    try {
      let JSONData = await getData();
      JSONData.sort((a, b) =>
        a.Phase > b.Phase ? 1 : b.Phase > a.Phase ? -1 : 0
      );
      let updatedReports = { ...reports };
      updatedReports.RbP.data = JSONData;
      updatedReports.RbP.created = true;
      setReports(updatedReports);
    } catch (error) {
      //@ts-ignore
      setMessage("Report could not be generated! Try again later");
    }
  };

  const residentByRoom = async () => {
    setMessage(undefined);
    try {
      let JSONData = await getData();
      JSONData.sort((a, b) =>
        a.RoomNum > b.RoomNum ? 1 : b.RoomNum > a.RoomNum ? -1 : 0
      );
      let updatedReports = { ...reports };
      updatedReports.RbR.data = JSONData;
      updatedReports.RbR.created = true;
      setReports(updatedReports);
    } catch (error) {
      //@ts-ignore
      setMessage("Report could not be generated! Try again later");
    }
  };

  const getData = async (type) => {
    let result = await getActiveResidents();
    let JSONData = result.data.recordset;
    let trimmedData = JSONData.map((res) => ({
      Name: `${res.ResLastName ? res.ResLastName : ""} ${
        res.ResFirstName ? res.ResFirstName : ""
      }`,
      RoomNum: res.RoomNum ? res.RoomNum : undefined,
      Phase: res.RecentPhase ? res.RecentPhase : undefined,
      LastEntryDate: res.LastEntryDate,
      DaysHere: res.LastEntryDate
      ? daysBetweenDates(res.LastEntryDate)
      : undefined,
    }));
    trimmedData.forEach((res,i) =>{
      let date = new Date(trimmedData[i].LastEntryDate)
      trimmedData[i].LastEntryDate = date.toLocaleString('en-US', { timeZone: 'CST' })+" (CST)"
    })
    return trimmedData;
  };

  const daysBetweenDates = (start) => {
    const date1 = new Date(start);
    const date2 = new Date();

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays + 1;
  };

  return (
    <div className="reports-Container">
      <div className="createResident-Container-headSection">
        <h2 className="primary">Reports</h2>
      </div>
      <div className="reports-Container-Section">
        <div className="reports-Container-Section-Individual">
          <div className="reports-Container-Section-Individual-Text">
            Resident by Name
          </div>
          <button className="report-button button" onClick={residentByName}>
            Generate
          </button>
          {reports.RbN.created && (
            <CSVLink data={reports.RbN.data} filename={reports.RbN.fileName}>
              <div className="reports-csv-button report-button button">
                Download
              </div>
            </CSVLink>
          )}
        </div>
        <div className="reports-Container-Section-Individual">
          <div className="reports-Container-Section-Individual-Text">
            Resident by Phase
          </div>
          <button className="report-button button" onClick={residentByPhase}>
            Generate
          </button>
          {reports.RbP.created && (
            <CSVLink data={reports.RbP.data} filename={reports.RbP.fileName}>
              <div className="reports-csv-button report-button button">
                Download
              </div>
            </CSVLink>
          )}
        </div>
        <div className="reports-Container-Section-Individual">
          <div className="reports-Container-Section-Individual-Text">
            Resident by Room
          </div>
          <button className="report-button button" onClick={residentByRoom}>
            Generate
          </button>
          {reports.RbR.created && (
            <CSVLink data={reports.RbR.data} filename={reports.RbR.fileName}>
              <div className="reports-csv-button report-button button">
                Download
              </div>
            </CSVLink>
          )}
        </div>
      </div>
      {message && <div className="updateResident-footer">{message}</div>}
    </div>
  );
}

export default Reports;
