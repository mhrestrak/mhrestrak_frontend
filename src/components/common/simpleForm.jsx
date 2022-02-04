import React from "react";
import InputFieldLayoutRow from "./inputFieldLayoutRow";
import  Joi  from "joi-browser";

const Form = ({ onChange, data, submit, buttonLabel }) => {
    console.log(data)
  const handleChange = (json, name) => {
    let itemName = name.split("_");

    let item = data[parseInt(itemName[1], 10)][parseInt(itemName[2], 10)];

    if (item.type === "input" || item.type === "select") {
      item.value =
        json.currentTarget.value === "" ? undefined : json.currentTarget.value;
    } else if (item.type === "checkbox") {
      item.value = json.target.checked;
    } else if (item.type === "date" || item.type === "yesNo") {
      item.value = json;
    }

    const errorMessage = validateProperty(item);
    if (errorMessage) item.error = errorMessage;
    else item.error = undefined;
    return onChange(itemName, item);
  };

  const doSubmit = () => {
    let result = validate();
    return submit(result)
  };

  //====================================== Validations ========================================

  const validate = () => {
    const options = { abortEarly: false };
    let schema = {};
    let validationData = {};
    let data1 = [...data];
    data1.forEach((row) => {
      row.forEach((item) => {
        schema[item.label] = item.schema;
        validationData[item.label] = item.value;
      });
    });

    const { error } = Joi.validate(validationData, schema, options);
    if (!error) return {validation : true};

    data1.forEach((row, rowI) => {
      row.forEach((item, itemI) => {
        error.details.forEach((er) => {
          if (er.path[0] === item.label) {
            data1[rowI][itemI].error = er.message;
          }
        });
      });
    });
    return {validation : false, update : data1}
  };

  const buttonValidation =() =>{
    const options = { abortEarly: false };
    let schema = {};
    let validationData = {};
    let data1 = [...data];
    data1.forEach((row) => {
      row.forEach((item) => {
        schema[item.label] = item.schema;
        validationData[item.label] = item.value;
      });
    });

    const { error } = Joi.validate(validationData, schema, options);
    if (!error) return null;
    return true
  }

  const validateProperty = ({ name, value, schema, label }) => {
    // const obj = { [name.split("_")[3]]: value };
    // const schema1 = { [name.split("_")[3]]: schema };
    const obj = { [label]: value };
    const schema1 = { [label]: schema };
    const { error } = Joi.validate(obj, schema1);
    return error ? error.details[0].message : null;
  };

  return (
    <div className="simpleForm-Container-formSection">
      {data.map((row, i) => (
        <InputFieldLayoutRow
          key={i.toString()}
          data={row}
          onChange={handleChange}
        />
      ))}
      <div className="simpleForm-Container-endSection">
        {submit && (
          <button
            className="formSection-rowItem-nextButton button"
            onClick={doSubmit}
            disabled={buttonValidation()}
          >
            {buttonLabel ? buttonLabel :"Submit"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Form;
