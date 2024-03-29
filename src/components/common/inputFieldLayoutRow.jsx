import React from "react";
import Input from "./input";
import CheckBox from "../common/checkbox";
import Date from "../common/date";
import Select from "../common/select";
import YesNo from "./yesNo";
import TextArea from "./textarea";
// import ImageChooser from "./imageChooser";
import AWSImagePicker from "./awsImagePicker";

const InputFieldLayoutRow = (props) => {
  let data = props.data;

  const renderInput = (item) => {
    return (
      <Input
        type={item.typeName}
        onChange={(json) => props.onChange(json, item.name)}
        name={item.name}
        label={item.label}
        value={item.value ? item.value : ""}
        showLabel={true}
        error={item.error}
      />
    );
  };

  const renderTextBox = (item) => {
    return (
      <TextArea
        type={item.typeName}
        onChange={(json) => props.onChange(json, item.name)}
        name={item.name}
        label={item.label}
        value={item.value ? item.value : ""}
        showLabel={true}
        error={item.error}
      />
    );
  };

  const renderSelect = (item) => {
    return (
      <Select
        onChange={(json) => props.onChange(json, item.name)}
        name={item.name}
        label={item.label}
        options={item.options}
        // options={item.options.map((option) => ({
        //   _id: option._id,
        //   name: option.name,
        // }))}
        value={item.value ? item.value : undefined}
        error={item.error} 
        noClear={undefined}      />
    );
  };

  const renderCheckbox = (item) => {
    return (
      <CheckBox
        onChange={(json) => props.onChange(json, item.name)}
        name={item.name}
        label={item.label}
        checked={item.value}
        error={item.error}
      />
    );
  };

  const renderYesNo = (item) => {
    return (
      <YesNo
        onChange={(json) => props.onChange(json, item.name)}
        name={item.name}
        label={item.label}
        value={item.value}
        error={item.error}
      />
    );
  };

  const renderDate = (item) => {
    return (
      <Date
        onChange={(json) => {
          props.onChange(json, item.name)
          console.log(json)
          console.log(item.value)
        }}
        name={item.name}
        label={item.label}
        value={item.value ? item.value : null}
        error={item.error}
      />
    );
  };

  const renderImagePicker = (item) => {
    return (
      <AWSImagePicker
        onChange={(data) => props.onChange(data, item.name)}
        name={item.name}
        label={item.label}
        value={item.value ? item.value : undefined}
        url={item.url ? item.url : undefined}
        showLabel={true}
        error={item.error}
      />
    );
  };
  // const renderImagePicker = (item) => {
  //   return (
  //     <ImageChooser
  //       onChange={(url) => props.onChange(url, item.name)}
  //       name={item.name}
  //       label={item.label}
  //       value={item.value ? item.value : undefined}
  //       showLabel={true}
  //       error={item.error}
  //     />
  //   );
  // };

  const renderItem = (item) => {
    switch (item.type) {
      case "input":
        return renderInput(item);
      case "textBox":
        return renderTextBox(item);
      case "select":
        return renderSelect(item);
      case "checkbox":
        return renderCheckbox(item);
      case "date":
        return renderDate(item);
      case "yesNo":
        return renderYesNo(item);
      case "imagePicker":
        return renderImagePicker(item);
      default:
        return renderInput(item);
    }
  };

  return (
    <div className="createResident-Container-formSection-row">
      {data.map((item, i) => (
        <div
          className={
            (i=== 0 ? "createResident-Container-formSection-rowItem " : i=== data.length-1 ? "createResident-Container-formSection-rowItem-end ": "createResident-Container-formSection-rowItem-center " )+ item.size
          }
          key={i.toString()}
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};

export default InputFieldLayoutRow;
