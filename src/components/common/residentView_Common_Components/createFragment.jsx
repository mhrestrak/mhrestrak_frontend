/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import uniqid from "uniqid";
import Form from "../simpleForm";

import { getList } from "../../../services/listService";
import { getMedicationObject } from "../../../utils/medicationObject";
import { createResidentFragment } from "../../../services/residentService";
import { getDrugsObject } from "../../../utils/drugsObject";
import { getEducationObject } from "../../../utils/educationObject";
import { getobject } from "../../../utils/residentObject";
import { getMedicalObject } from "../../../utils/medicalObject";
import { getLegalobject } from "../../../utils/legalCasesObject";
import { getStatesOfCountry } from "../../../services/dropdownLocationService";
import { getContactObject } from "../../../utils/contactObject";

// { title: "Medication", name: "medication", items: [], state : "View", titleName : "MedicationName" },
// { title: "Drug", name: "drug", items: [], state : "View", titleName : "DrugOfChoice" },
// { title: "Education", name: "education", items: [], state : "View", titleName : "EducationName" },
// { title: "Employment", name: "employment", items: [], state : "View", titleName : "JobTitle" },
// { title: "Medical", name: "medical", items: [], state : "View", titleName : "Illness" },
// { title: "Legal", name: "legal", items: [], state : "View", titleName : "CaseName" },
const CreateFragment = ({ onCreate, ResId, name, ...props }) => {
  const [creationObject, setCreationObject] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const asyncFunc = async () => {
      if (name === "contacts") {
        let object = getContactObject();
        let states1 = await getStatesOfCountry("United States");
        object[3][0].options = states1;
        let lists1 = await getList(11);
        object[0][0]["options"] = lists1;
        setCreationObject(object);
      }
      if (name === "medication") {
        let object = getMedicationObject();
        setCreationObject(object);
      }
      if (name === "drug") {
        let object = getDrugsObject();
        setCreationObject(object);
      }
      if (name === "education") {
        let object = getEducationObject();
        let lists = await getList(2);
        object[0][0]["options"] = lists;
        setCreationObject(object);
      }
      if (name === "employment") {
        let object = getobject();
        object = object.employment;
        setCreationObject(object);
      }
      if (name === "medical") {
        let object = getMedicalObject();
        setCreationObject(object);
      }
      if (name === "legal") {
        let object = getLegalobject();
        let states = await getStatesOfCountry("United States");
        object[2][1].options = states;
        setCreationObject(object);
      }
      // let noteList = await getList(4);
      // const tempCObject = [...creationObject]
      // tempCObject[0][0]["options"] = noteList
      // setCreationObject(tempCObject)
    };
    asyncFunc();
  }, []);

  const handleChange = (name, item) => {
    const tempCObject = [...creationObject];
    tempCObject[parseInt(name[1], 10)][parseInt(name[2], 10)] = item;
    setCreationObject(tempCObject);
  };

  const handleSubmit = async ({ validation, errorData }) => {
    if (validation) {
      console.log("ddfdfdf");
      let tempObject = {
        ResID: ResId,
        ID: uniqid(),
        // LastModifiedDateTime: name !== "education"  ? new Date() : undefined,
      };
      creationObject.forEach((row) => {
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
        let { data } = await createResidentFragment(name, tempObject);
        if (data) onCreate(name);
        else setMessage("Failed to create Fragment");
      } catch (error) {
        //@ts-ignore
        setMessage("Failed to create Fragment");
      }
    } else setCreationObject(errorData);
  };

  return (
    <div className="notesCreation-Container">
      {creationObject && (
        <Form
          buttonLabel={"Add"}
          data={creationObject}
          onChange={handleChange}
          submit={handleSubmit}
        />
      )}
      {message && <div className="updateResident-footer">{message}</div>}
    </div>
  );
};

export default CreateFragment;
