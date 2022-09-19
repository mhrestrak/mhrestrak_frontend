
import Date1 from "../../components/common/date";
import React from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { getActiveResidents, getDischargeLocationData } from "../../services/residentService";

function Reports(props) {
  let minusoneMonth = new Date()
  minusoneMonth.setDate(minusoneMonth.getDate()-30)
  const [DL_Dates, setDL_Dates] = useState({
    startDate : minusoneMonth,
    endDate : new Date(),
  })

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
    DLR : {
      data: [],
      created: false,
      fileName: "Discharge-Location-Report.csv",
    }
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

  const createDLReport = async () => {
    setMessage(undefined);
    try {
      let JSONData = await getDischargeLocationData(DL_Dates.startDate, DL_Dates.endDate);
      if(JSONData.data?.length === 0){
        //@ts-ignore
        setMessage("Not records found in this period");
      }else{
        console.log(JSONData)
        let updatedReports = { ...reports };
        updatedReports.DLR.data = JSONData.data;
        updatedReports.DLR.created = true;
        setReports(updatedReports);
      }
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
    trimmedData.forEach((res, i) => {
      let date = new Date(trimmedData[i].LastEntryDate);
      trimmedData[i].LastEntryDate =
        date.toLocaleString("en-US", { timeZone: "CST" }) + " (CST)";
    });
    return trimmedData;
  };

  const DL_startDate_change = (date) =>{
    const tempDL = {...DL_Dates}
    tempDL.startDate = date
    setDL_Dates(tempDL)
  }
  const DL_endDate_change = (date) =>{
    const tempDL = {...DL_Dates}
    tempDL.endDate = date
    setDL_Dates(tempDL)
  }

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
const AppKey = "pamhzojpeq49ubv"
  
  return (
    <div className="reports-Container">
      <div className="createResident-Container-headSection">
        <h2 className="primary">Reports</h2>
      </div>
      <div className="reports-Container-Section">
        <div className="reports-Container-Section-Individual">
          <div className="reports-Container-Section-Individual-Text">
            Get Residents by Name
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
            Get Residents by Phase
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
            Get Residents by Room
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
      <div className="reports-Container-Section">
        <div className="reports-Container-Section-Individual">
          <div className="reports-Container-Section-Individual-Text">
            Discharge Location Report
          </div>
          <div className="reports-Container-Section-Individual-Dates">
            <Date1
              onChange={(value) => DL_startDate_change(value)}
              name={"startDate"}
              label={"From"}
              value={DL_Dates?.startDate ? DL_Dates.startDate : null}
            />
            <Date1
              onChange={(value) => DL_endDate_change(value)}
              name={"endDate"}
              label={"To"}
              value={DL_Dates?.endDate ? DL_Dates.endDate : null}
            />
          </div>
              <button className="report-button button" onClick={createDLReport}>
                Generate
              </button>
              {reports.DLR.created && (
                <CSVLink
                  data={reports.DLR.data}
                  filename={reports.DLR.fileName}
                >
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
