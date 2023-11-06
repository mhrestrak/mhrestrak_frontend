import React from "react";
import { useState, useEffect } from "react";
import ToggleList from "../../components/common/residentView_Common_Components/ToggleList";
import { addDeviceToAdmission, getActiveResidentsWithDevices, removeDeviceFromAdmission, toggleCheckInResidentDevice } from "../../services/residentService";
import Select from "../../components/common/select";
import { toast } from "react-toastify";

function CheckIn(props) {
  const [deviceType, setDeviceType] = useState("Mobile");
  const [residents, setResidents] = useState([]);
  const [inProcess, setInProcess] = useState(true);
  const [WithoutDevice, setWithoutDevice] = useState([]);
  const [CheckedInRes, setCheckInRes] = useState([]);
  const [CheckedOutRes, setCheckOutRes] = useState([]);
  const [resToAdd, setResToAdd] = useState()

  useEffect(() => {
    getResidents()
  }, []);

  const getResidents = async () =>{
    try {
      const { data: residentsFound } = await getActiveResidentsWithDevices();
      setResidents(residentsFound);
      setInProcess(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (residents.length === 0) {
      setCheckInRes([]);
      setCheckOutRes([]);
      setWithoutDevice([]);
    }
    let tempWithoutDevice = [];
    let tempCheckedInRes = [];
    let tempCheckedOutRes = [];

    residents.forEach((resident) => {
      if (resident["Has" + deviceType]) {
        if (resident["CheckedIn" + deviceType]) tempCheckedInRes.push(resident);
        else tempCheckedOutRes.push(resident);
      } else {
        tempWithoutDevice.push(resident);
      }
    });
    setWithoutDevice(tempWithoutDevice);
    setCheckInRes(tempCheckedInRes);
    setCheckOutRes(tempCheckedOutRes);
  }, [residents, deviceType]);

  const checkInResident = async (res) => {
    setInProcess(true)
    await toggleCheckInResidentDevice(({checkIn : true, deviceType, id : res.AdmissionID}))
    getResidents()
    toast.success(`Checked In ${res.ResFirstName + " " +res.ResLastName}'s ${deviceType}`)
  };

  const checkOutResident = async (res) => {
    setInProcess(true)
    await toggleCheckInResidentDevice(({checkIn : false, deviceType, id : res.AdmissionID}))
    getResidents()
    toast.success(`Returned ${res.ResFirstName + " " +res.ResLastName}'s ${deviceType}`)
  };

  const addDeviceToResidentAddmission = async () => {
    if(resToAdd){
      setInProcess(true)
      await addDeviceToAdmission({deviceType, id : resToAdd})
      getResidents()
      setResToAdd(undefined)
      toast.success(`${deviceType} added to Resident`)
    }
  }

  const removeDevice = async (res) => {
      setInProcess(true)
      await removeDeviceFromAdmission({deviceType, id : res.AdmissionID})
      getResidents()
      toast.success(`Removed ${res.ResFirstName + " " +res.ResLastName}'s ${deviceType}`)
  }

  return (
    <div className="reports-Container">
      <div className="checkin-Container-headSection">
        <div className="checkin-HeadTextContainer">
          <h2>Device Check In :</h2>
          <h2 className="primary">{deviceType}</h2>
        </div>
        <div className="checkin-Container-Section marginVertical">
          <button
            className={`checkin-button ${
              deviceType === "Mobile" ? "button" : "b primaryOutlineButton"
            }`}
            disabled={inProcess ? true : deviceType === "Mobile"}
            onClick={() => setDeviceType("Mobile")}
          >
            Mobile
          </button>
          <button
            className={`checkin-button ${
              deviceType === "Tablet" ? "button" : "b primaryOutlineButton"
            }`}
            disabled={inProcess ? true : deviceType === "Tablet"}
            onClick={() => setDeviceType("Tablet")}
          >
            Tablet
          </button>
        </div>
      </div>
      {WithoutDevice.length >0 &&
      <div className="checkin-Container-Section backgroundLight marginBottom roundedCorners paddingRight01 paddingLeft01 paddingVertical  alignCenter">
        <h5>Add active residents with {deviceType}</h5>
        <div className="checkin-Contianer-Dropdown">
          <Select options={WithoutDevice.map((res) =>({_id : res.ResID, name : `${res.ResFirstName} ${res.ResLastName}`, value : res.AdmissionID}))} onChange={(value) =>setResToAdd(value.currentTarget.value)} value={resToAdd}/>
          <button className={`b ${!inProcess ? !resToAdd && "fadedButton" : "fadedButton"}`} disabled={inProcess? true : resToAdd ? false : true} onClick={addDeviceToResidentAddmission}>Add Resident</button>
        </div>
      </div>
      }
      {/* Checkin Data */}
      <div className="checkin-Container-Section">
        <div className="checkin-Container-Section-Individual">
          <h4 className="primary">On Person</h4>
          <ToggleList data={CheckedOutRes} onToggle={checkInResident} onRemove={removeDevice}/>
        </div>
        <div className="checkin-Container-Section-Individual">
          <h4 className="primary">Checked In</h4>
          <ToggleList data={CheckedInRes} onToggle={checkOutResident} onRemove={removeDevice}/>
        </div>
      </div>
    </div>
  );
}

export default CheckIn;
