import React from "react";

const DataItems = (props) => {
  let text = "";
  if (props.sectionName === "family") {
    text = props.data.ChildName;
  } else if (props.sectionName === "education") {
    text = props.data.EducationName;
  } else if (props.sectionName === "drugs") {
    text = "Drug item " + (props.index + 1);
  } else if (props.sectionName === "legal") {
    text = "Legal Case" + (props.index + 1);
  } else if (props.sectionName === "finances") {
    text = "Finance Item " + (props.index + 1) + " - " + props.data.DebtName;
  } else if (props.sectionName === "medical") {
    text = "Medical Item " + (props.index + 1);
  } else if (props.sectionName === "medication") {
    text = "medication Item " + (props.index + 1);
  } else {
    text = "configure text";
  }
  return (
    <div className="dataItems-Container">
      <span>{text}</span>
      <button
        className="cancelbutton"
        onClick={() => props.delete(props.index)}
      >
        x
      </button>
    </div>
  );
};

export default DataItems;
