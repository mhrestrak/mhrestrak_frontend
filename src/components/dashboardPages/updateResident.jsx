import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getResidentUpdateObject } from "../../utils/residentUpdateObject";
import { getResidentByID, updateResident } from "../../services/residentService";
import Form from "../common/simpleForm";

const UpdateResident = (props) => {
  const ResID = window.location.pathname.split("/")[3];
  const [data, setData] = useState({
    formStructure: getResidentUpdateObject(),
    resident: {},
    resFound: 1,
  });
  const [message, setMessage] = useState();

  useEffect(() => {
    let tempData = { ...data };
    console.log(tempData)
    const getandSetResident = async () =>{
        try {
          let user = await getResidentByID(ResID);
          console.log(user);
          if (user.data) {
            tempData.resident = user.data;
            tempData.formStructure[0][0]["value"] = user.data.RoomNum ? user.data.RoomNum.toString() : undefined;
            tempData.formStructure[0][1]["value"] = user.data.RecentPhase ? user.data.RecentPhase : undefined;
            tempData.formStructure[1][0]["value"] = user.data.IsActive ? true : false;
            tempData.resFound = 2;
            setData(tempData);
          }
        } catch (error) {
          tempData.resFound = 3;
          setData(tempData);
          //@ts-ignore
          setMessage("Resident not found!")
        }
    }
    getandSetResident()
  });

  const handleChange = (name, item) =>{
    let updatedData = {...data};
    updatedData.formStructure[parseInt(name[1],10)][parseInt(name[2], 10)] = item
    updatedData.resident[name[3]] = item.value
    setData(updatedData);
  }

  const doSubmit = async ({validation, errorData}) => {
    let updatedData = {...data}
    
    if(validation){
        try {
          console.log(data.resident)
            let result = await updateResident(data.resident);
            console.log(result)
            //@ts-ignore
            setMessage("Updated");
        } catch (error) {
            //@ts-ignore
            setMessage("Failed to Update Resident");
        }
    }else{
        updatedData.formStructure = errorData
        setData(updatedData)
    }

    //   update();
    //   setActiiveSession("submitting");
    //   let prepedData = prepAdmissionData({ ...formData }, ResID);
    //   let result = await CreateResAdmission(prepedData);
    //   setActiiveSession("success");

  };

  return (
    <div className="updateResident-Container">
      <div className="createResident-Container-headSection">
        <h2 className="primary">Update Resident</h2>
      </div>
      {data.resFound === 2 && 
        <>
        {/* @ts-ignore */}
            <Form
                data={data.formStructure}
                onChange={handleChange}
                submit={doSubmit}
                buttonLabel={"Update"}
            >
            </Form>
            {message &&  
            <div className="updateResident-footer">
                {message}
            </div>
            }
        </>
      }
    </div>
  );
};

export default UpdateResident;
