import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../../services/authService";
import {
  getAdmission,
  updateResidentDisciplinaryPoints,
} from "../../../services/residentService";
import { getList } from "../../../services/listService";
import Form from "../simpleForm";
import { geDisciplinaryObject } from "../../../utils/disciplinaryObject";

const DisciplinaryClipboard = ({ ResID, updateed }) => {
  const [admission, setAdmission] = useState();
  const [totalPoints, setTotalPoints] = useState(0);
  const [disciplinaryOptions, setDisciplinaryOptions] = useState([]);
  const [disciplinaryPointsList, setDisciplinaryPointsList] = useState([]);
  const [message, setMessage] = useState("");
  const [pointToUpdate, setPointToUpdate] = useState();
  const [state, setState] = useState(1);

  useEffect(() => {
    const asyncFun = async () => {
      await getListOfDisciplines();
      getAdmissionInfo();
    };
    asyncFun();
  }, []);

  useEffect(() => {
    if (admission) {
      let tempPoints = admission.DisciplinaryPoints;
      if(tempPoints) tempPoints = JSON.parse(tempPoints)
      console.log(tempPoints)
      if (tempPoints?.length > 0) {
        setDisciplinaryPointsList(tempPoints);
        let tempTotal = 0;
        tempPoints.forEach((temp) => {
          tempTotal = tempTotal + temp.points;
        });
        setTotalPoints(tempTotal);
      } else {
        setDisciplinaryPointsList([]);
        setTotalPoints(0);
      }
      setState(1);
    }
  }, [admission]);

  useEffect(() => {});

  const openForm = () => {
    let object = geDisciplinaryObject();
    object[0][0].options = disciplinaryOptions;
    setPointToUpdate(object);
    setState(2);
  };

  const cancelCreate = () => {
    setPointToUpdate();
    setState(1);
  };

  const getListItem = (value) => {
    let value1;
    disciplinaryOptions.forEach((option) => {
        console.log(option)
      if (option.value == value) value1 = option;
    });
    return value1;
  };

  const getAdmissionInfo = async () => {
    let result = await getAdmission(ResID);
    if (result.data) setAdmission(result.data);
  };

  const getListOfDisciplines = async () => {
    let list = await getList(12);
    console.log("list", list);
    return setDisciplinaryOptions(list);
  };

  const handleChange = (name, item) => {
    const tempObject = [...pointToUpdate];
    tempObject[parseInt(name[1], 10)][parseInt(name[2], 10)] = item;
    setPointToUpdate(tempObject);
  };

  const handleSubmit = async ({ validation, errorData }) => {
    if (validation) {
      let tempAdmission = {
        AdmissionID: admission.AdmissionID,
        DisciplinaryPoints: disciplinaryPointsList,
      };
      console.log(getListItem(pointToUpdate[0][0].value))
      let point = {
        _id: new Date().valueOf().toString(),
        reason: getListItem(pointToUpdate[0][0].value).name,
        comment: pointToUpdate[0][1].value,
        points: getListItem(pointToUpdate[0][0].value).subValue,
        listId: getListItem(pointToUpdate[0][0].value).value,
      };

      if (tempAdmission.DisciplinaryPoints)
        tempAdmission.DisciplinaryPoints.push(point);
      else tempAdmission.DisciplinaryPoints = [point];

      try {
        let { data } = await updateResidentDisciplinaryPoints(tempAdmission);
        if (data.data) {
          setAdmission(data.data);
        }
        updateed(data.data)
        setPointToUpdate(undefined);
      } catch (error) {
        //@ts-ignore
        setMessage("Failed to update Fragment");
      }
    } else setPointToUpdate(errorData);
  };

  //   const deletePoint = (point) =>{
  //     let tempAdmission = {
  //         AdmissionID: admission.AdmissionID,
  //         DisciplinaryPoints : admission.DisciplinaryPoints
  //       };

  //     try {
  //         let { data : data1 } = await updateResidentDisciplinaryPoints(tempAdmission);
  //         if (data1) onUpdate(name);
  //         else setMessage("Failed to delete Fragment");
  //       } catch (error) {
  //         console.log(error)
  //         //@ts-ignore
  //         setMessage("Failed to delete Fragment");
  //       }
  //   }

  return (
    <div className="residentView-sectionBox">
      <div className="residentView-sectionBox-header">
        <h4 className="primary">Disciplinary Clipboard</h4>
        {state === 1 ? (
          <button className="b secondayButton" onClick={() => openForm()}>
            Add
          </button>
        ) : (
          <button className="b blackButton" onClick={() => cancelCreate()}>
            Cancel
          </button>
        )}
      </div>
      {state === 1 ? (
        <>
          <div className="residentView-sectionBox-header paddingTop01">
            <h5>Total points this admission</h5>
            <h5 className="primary">{totalPoints}</h5>
          </div>
          <div className="residentView-section">
            {disciplinaryPointsList?.length > 0 ? (
              disciplinaryPointsList.map((list) => (
                <div className="fragmentList-Item-NoMargin" key={list._id}>
                  <div className="fragmentList-Item-Title">{list.reason}</div>
                  <span className="primary">{list.points}</span>
                </div>
              ))
            ) : (
              <div className="fragmentList-NoData">No Entries</div>
            )}
          </div>
        </>
      ) : (
        <div className="residentView-section">
          <Form
            buttonLabel={"Add"}
            data={pointToUpdate}
            onChange={handleChange}
            submit={handleSubmit}
          />
          {message && <div className="updateResident-footer">{message}</div>}
        </div>
      )}
    </div>
  );
};

// function dateFormatter(d){
//     d = new Date(d)
//     return d.getDate() + "/" +  (d.getMonth() + 1) + "/" +  d.getFullYear();
// }

export default DisciplinaryClipboard;
