import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import uniqid from "uniqid";

import Form from "../simpleForm";

import { getList } from "../../../services/listService";
import { getNoteCreationObject } from "../../../utils/noteCreationObject";
import { createNote } from "../../../services/residentFragments/frag_notes";


const CreateNote = ( {onCreate, ResId,...props}) => {
  const [creationObject, setCreationObject] = useState(getNoteCreationObject())
  const [message, setMessage] = useState("");

  useEffect(() =>{
    const asyncFunc = async () => {
        let noteList = await getList(4);
        const tempCObject = [...creationObject]
        tempCObject[0][0]["options"] = noteList
        setCreationObject(tempCObject)
    }
    asyncFunc()
  },[])

  const handleChange =(name, item) =>{
    const tempCObject = [...creationObject]
    tempCObject[parseInt(name[1], 10)][parseInt(name[2], 10)] = item;
    setCreationObject(tempCObject)
  };

  const handleSubmit = async ({ validation, errorData }) => {
    if (validation) {
      const tempNote = {
        ResID : ResId,
        ID : uniqid(),
        NoteDateTime : new Date(),
      };
      creationObject.forEach((row) => {
        row.forEach((item) => {
          let key = item.name.split("_")[3];
          tempNote[key] = item.value;
        });
      });
      try {
        let {data} = await createNote(tempNote);
        if(data) onCreate()
        else setMessage("Failed to create Note");
    } catch (error) {
        //@ts-ignore
        setMessage("Failed to Create Note");
      }
    } else setCreationObject(errorData);
  };

  return (
    <div className="notesCreation-Container">
      <Form 
        buttonLabel={"Create Note"} 
        data={creationObject} 
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


export default CreateNote;
