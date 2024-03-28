/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Form from "../simpleForm";

import { getList } from "../../../services/listService";
import { getMedicationObject } from "../../../utils/medicationObject";
import { deleteResidentFragment, updateResidentFragment } from "../../../services/residentService";
import { getDrugsObject } from "../../../utils/drugsObject";
import { getEducationObject } from "../../../utils/educationObject";
import { getobject } from "../../../utils/residentObject";
import { getMedicalObject } from "../../../utils/medicalObject";
import { getLegalobject } from "../../../utils/legalCasesObject";
import { getStatesOfCountry } from "../../../services/dropdownLocationService";
import { getCurrentUser } from "../../../services/authService";
import { getContactObject } from "../../../utils/contactObject";

// { title: "Medication", name: "medication", items: [], state : "View", titleName : "MedicationName" },
// { title: "Drug", name: "drug", items: [], state : "View", titleName : "DrugOfChoice" },
// { title: "Education", name: "education", items: [], state : "View", titleName : "EducationName" },
// { title: "Employment", name: "employment", items: [], state : "View", titleName : "JobTitle" },
// { title: "Medical", name: "medical", items: [], state : "View", titleName : "Illness" },
// { title: "Legal", name: "legal", items: [], state : "View", titleName : "CaseName" },
const UpdateFragment = ({ data, onUpdate, name, ...props }) => {
  let user = getCurrentUser()
  const [updationObject, setUpdationObject] = useState();
  const [message, setMessage] = useState("");
  useEffect(() => {
    const asyncFunc = async () => {
      let object;
      switch (name) {
        case "contacts":
          object = getContactObject();
          let states1 = await getStatesOfCountry("United States");
          object[3][0].options = states1;
          let lists1 = await getList(11);
          object[0][0]["options"] = lists1;
          break;
        case "medication":
          object = getMedicationObject();
          break;
        case "drug":
          object = getDrugsObject();
          break;
        case "education":
          object = getEducationObject();
          let lists = await getList(2);
          object[0][0]["options"] = lists;
          break;
        case "employment":
          object = getobject();
          object = object.employment;
          break;
        case "medical":
          object = getMedicalObject();
          break;
        case "legal":
          object = getLegalobject();
          let states = await getStatesOfCountry("United States");
          object[2][1].options = states;
          break;
        default:break;
      }
      object.forEach((row,i) => {
        row.forEach((item,index) => {
          let key = item.name.split("_")[3];
          if(data[key]){
            object[i][index].value= data[key]
          }
        });
      });
      setUpdationObject(object);
      // let noteList = await getList(4);
      // const tempCObject = [...creationObject]
      // tempCObject[0][0]["options"] = noteList
      // setCreationObject(tempCObject)
    };
    asyncFunc();
  }, []);

  const handleChange = (name, item) => {
    const tempCObject = [...updationObject];
    tempCObject[parseInt(name[1], 10)][parseInt(name[2], 10)] = item;
    setUpdationObject(tempCObject);
  };

  const handleSubmit = async ({ validation, errorData }) => {
    if (validation) {
      let tempObject = {
        ResID: data.ResID,
        ID: data.ID,
        // LastModifiedDateTime: name !== "education"  ? new Date() : undefined,
      };
      updationObject.forEach((row) => {
        row.forEach((item) => {
          let key = item.name.split("_")[3];
          tempObject[key] = item.value;
        });
      });

      //remove Null
      tempObject = Object.fromEntries(
        Object.entries(tempObject).filter(([_, v]) => v != null)
      );

      try {
        let { data } = await updateResidentFragment(name, tempObject);
        if (data) onUpdate(name);
        else setMessage("Failed to update Fragment");
      } catch (error) {
        //@ts-ignore
        setMessage("Failed to update Fragment");
      }
    } else setUpdationObject(errorData);
  };

  const deleteFragment = async () =>{
    try {
        let { data : data1 } = await deleteResidentFragment(name, data.ID);
        if (data1) onUpdate(name);
        else setMessage("Failed to delete Fragment");
      } catch (error) {
        console.log(error)
        //@ts-ignore
        setMessage("Failed to delete Fragment");
      }
  }

  return (
    <div className="notesCreation-Container">
      {updationObject && (
        <Form
          buttonLabel={"Update"}
          data={updationObject}
          onChange={handleChange}
          submit={handleSubmit}
          secondaryAction={deleteFragment}
          secondaryActionLabel="Delete"
          readOnly={(user.isCaseCoordinator ||  user.isAdmin || user.isCenterCoordinator) ? false : true}
        />
      )}
      {message && <div className="updateResident-footer">{message}</div>}
    </div>
  );
};

export default UpdateFragment;
