/* eslint-disable react-hooks/exhaustive-deps */
import Joi from "joi-browser";
import React from "react";
import { useState, useEffect } from "react";
import {
  getCitiesOfState,
  getStatesOfCountry,
} from "../../../services/dropdownLocationService";
import { getList } from "../../../services/listService";
import InputFieldLayoutRow from "../inputFieldLayoutRow";
import DataItems from "./dataItems";

const MultiItemGenerator = ({
  data,
  setData: setD,
  sectionName,
  sectionModel,
  toPreviousSection,
  toNextSection,
  submitWholeForm,
}) => {
  const [GenState, setGenState] = useState("list");
  const [model, setModel] = useState([...sectionModel]);
//@ts-ignore
  useEffect(() => {
    const asyncFunction = async () =>{
      let data1 = model.map((item) => item);
      if (sectionName === "education") {
        let lists = await getList(2);
        let LastIndex = lists.length-1
        var element = lists[LastIndex];
        lists.splice(LastIndex, 1);
        lists.splice(2, 0, element);
        data1[0][0].options = lists;
        setModel(data1);
      } else if (sectionName === "finances") {
        let debtCategories = await getList(6);
        data1[0][1].options = debtCategories;
        setModel(data1);
      } else if (sectionName === "legal") {
        let states = await getStatesOfCountry("United States");
        data1[2][1].options = states;
        setModel(data1);
      }
    }
    asyncFunction()
  }, []);

  const onChange = (json, name) => {
    console.log("ooooo")
    let itemName = name.split("_");

    let item = model[parseInt(itemName[1], 10)][parseInt(itemName[2], 10)];
    console.log(item, "pp")
    
    let updatedData = [...model];

    if (item.type === "input" || item.type === "select") {
      item.value =
        json.currentTarget.value === "" ? undefined : json.currentTarget.value;
    } else if (item.type === "checkbox") {
      item.value = json.target.checked;
    } else if (item.type === "date" || item.type === "yesNo") {
      item.value = json;
    }else if(item.type === "imagePicker") {
      console.log("Sd")
      item.value = json;
    }

    const errorMessage = validateProperty(item);
    if (errorMessage) item.error = errorMessage;
    else item.error = undefined;

    if (itemName[3].endsWith("Country")) {
      let states = getStatesOfCountry(json.currentTarget.value);
      updatedData[parseInt(itemName[1], 10)][parseInt(itemName[2], 10) + 1][
        "options"
      ] = states;
    }

    if (
      itemName[3].endsWith("State") &&
      itemName[3] !== "legal_2_1_WarrentState"
    ) {
      let cities = getCitiesOfState(json.currentTarget.value);
      updatedData[parseInt(itemName[1], 10)][parseInt(itemName[2], 10) + 1][
        "options"
      ] = cities;
    }

    updatedData[parseInt(itemName[1], 10)][parseInt(itemName[2], 10)] = item;

    setModel(updatedData);
  };

  const removeItem = (index) => {
    setD(
      data.filter((item, i) => i != index),
      sectionName
    );
  };

  const clearFields = async () => {
    let sectionModel1 = [...sectionModel];
    if (sectionName === "education") {
      let lists = await getList(2);
        let LastIndex = lists.length-1
        var element = lists[LastIndex];
        lists.splice(LastIndex, 1);
        lists.splice(2, 0, element);
      sectionModel1[0][0].options = lists;
    } else if (sectionName === "finances") {
      let debtCategories = await getList(6);
      sectionModel1[0][1].options = debtCategories;
    } else if (sectionName === "legal") {
      let states = await getStatesOfCountry("United States");
      sectionModel1[2][1].options = states;
    }
    setModel([...sectionModel1]);
    setGenState("create");
  };

  const submit = () => {
    if (validate()) {
      let updatedFormData = {};
      model.forEach((row) => {
        row.forEach((item) => {
          updatedFormData[item.name.split("_")[3]] = item.value;
        });
      });
      let data1 = data.map((item) => item);
      data1.push(updatedFormData);
      setModel([...sectionModel]);
      setD(data1, sectionName);
      setGenState("list");
    }
  };

  const back = () => {
      setGenState("list");
  };

  const validate = () => {
    const options = { abortEarly: false };
    let schema = {};
    let validationData = {};
    let data = [...model];
    data.forEach((row) => {
      row.forEach((item) => {
        schema[item.label] = item.schema;
        validationData[item.label] = item.value;
      });
    });
    const { error } = Joi.validate(validationData, schema, options);
    if (!error) return true;

    data.forEach((row, rowI) => {
      row.forEach((item, itemI) => {
        error.details.forEach((er) => {
          if (er.path[0] === item.label) {
            data[rowI][itemI].error = er.message;
          }
        });
      });
    });

    setModel(data);
    return false;
  };

  const validateProperty = ({ name, value, schema, label }) => {
    // const obj = { [name.split("_")[3]]: value };
    // const schema1 = { [name.split("_")[3]]: schema };
    const obj = { [label]: value };
    const schema1 = { [label]: schema };
    const { error } = Joi.validate(obj, schema1);
    return error ? error.details[0].message : null;
  };

  return (
    <div className="multiItem-container">
      {GenState === "list" && (
        <>
          <div className="multiItem-container-Items">
            {data.length > 0 ? (
              data.map((item, i) => (
                <DataItems
                  key={i.toString()}
                  list={sectionName === "education" ? model[0][0].options : undefined}
                  data={item}
                  sectionName={sectionName}
                  index={i}
                  delete={removeItem}
                />
              ))
            ) : (
              <h6 className="noItems">No items Added</h6>
            )}
          </div>
          <div className="createResident-Container-formSection-rowItem-nextButton">
            <button
              className="formSection-rowItem-nextButton button"
              onClick={clearFields}
            >
              Add +
            </button>
          </div>
        </>
      )}
      {GenState === "list" && (
        <div className="createResident-Container-endSection">
          <div className="createResident-Container-formSection-rowItem-nextButton">
            {toPreviousSection && (
              <button
                className="formSection-rowItem-nextButton button"
                onClick={toPreviousSection}
              >
                Previous
              </button>
            )}
            {toNextSection && (
              <button
                className="formSection-rowItem-nextButton button"
                onClick={toNextSection}
              >
                Next
              </button>
            )}
            {submitWholeForm && (
              <button
                className="formSection-rowItem-nextButton button"
                onClick={submitWholeForm}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      )}
      {GenState === "create" && (
        <div className="createResident-Container-formSection">
          {model.map((row, i) => (
            <InputFieldLayoutRow
              key={i.toString()}
              data={row}
              onChange={onChange}
            />
          ))}
        </div>
      )}
      {GenState === "create" && (
        <div className="createResident-Container-endSection">
          <div className="createResident-Container-formSection-rowItem-nextButton">
            <button
              className="formSection-rowItem-nextButton button"
              onClick={back}
            >
              Back
            </button>
            <button
              className="formSection-rowItem-nextButton button"
              onClick={submit}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiItemGenerator;
