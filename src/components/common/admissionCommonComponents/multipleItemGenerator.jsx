import Joi from "joi-browser";
import React from "react";
import { useState, useEffect } from "react";
import {
  getCitiesOfState,
  getStatesOfCountry,
} from "../../../services/dropdownLocationService";
import { getList } from "../../../services/listService";
import { getFamilyObject } from "../../../utils/familyObject";
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
  const [model, setModel] = useState(sectionModel);

  useEffect(async () => {
    let data1 = model.map((item) => item);
    if (sectionName === "education") {
      let lists = await getList(2);
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
  }, []);

  const onChange = (json, name) => {
    let itemName = name.split("_");

    let item = model[parseInt(itemName[1], 10)][parseInt(itemName[2], 10)];

    let updatedData = [...model];

    if (item.type === "input" || item.type === "select") {
      item.value =
        json.currentTarget.value === "" ? undefined : json.currentTarget.value;
    } else if (item.type === "checkbox") {
      item.value = json.target.checked;
    } else if (item.type === "date") {
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

  const submit = () => {
    if (validate()) {
      let updatedFormData = {};
      model.forEach((row) => {
        row.forEach((item) => {
          updatedFormData[item.name.split("_")[3]] = item.value;
        });
      });
      console.log(data);
      let data1 = data.map((item) => item);
      data1.push(updatedFormData);
      setD(data1, sectionName);
      setGenState("list");
      setModel(sectionModel);
    }
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

  console.log(model);
  return (
    <div className="multiItem-container">
      {GenState === "list" && (
        <>
          <div className="multiItem-container-Items">
            {data.length > 0 ? (
              data.map((item, i) => (
                <DataItems
                  key={i.toString()}
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
              onClick={() => setGenState("create")}
            >
              Add Child +
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
