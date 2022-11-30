/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { updateResidentPhase } from "../../../services/residentService";
import { getPhaseChangeObject } from "../../../utils/phaseChangeObject";

import Form from "../simpleForm";

const PhaseChange = ( {onChange, ResId, phaseData,...props}) => {
  const [phaseChangeObject, setPhaseChangeObject] = useState(getPhaseChangeObject())
  const [message, setMessage] = useState("");

  useEffect(() =>{
    const asyncFunc = async () => {
        if(phaseData.length >0){
            let tempObject = [...phaseChangeObject]
            tempObject[0][1].value = new Date()
            setPhaseChangeObject(tempObject)
        }
    }
    asyncFunc()
  },[])

  const handleChange =(name, item) =>{
    const tempObject = [...phaseChangeObject]
    tempObject[parseInt(name[1], 10)][parseInt(name[2], 10)] = item;
    setPhaseChangeObject(tempObject)
  };

  const handleSubmit = async ({ validation, errorData }) => {
    if (validation) {
        phaseData[phaseData.length-1].outDate = phaseChangeObject[0][1].value
        phaseData.push({
          phase : phaseChangeObject[0][0].value,
          inDate : phaseChangeObject[0][1].value
        })
      const data1 = {
        ResID : ResId,
        phaseData
      };

      try {
        let {data} = await updateResidentPhase(data1);
        if(data) onChange()
        else setMessage("Failed to Change Phase");
    } catch (error) {
        //@ts-ignore
        setMessage("Failed to Change Phase");
      }
    } else setPhaseChangeObject(errorData);
  };

  return (
    <div className="notesCreation-Container">
      <Form 
        buttonLabel={"Change Phase"} 
        data={phaseChangeObject} 
        onChange={handleChange} 
        submit={handleSubmit}
      />
      {message && (
              <div className="updateResident-footer">
                {message}
              </div>
            )}
    </div>
  );
};


export default PhaseChange;
