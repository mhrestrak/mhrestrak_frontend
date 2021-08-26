import React from "react";

const DataItems = (props) => {
  let text = "";
  if (props.sectionName === "family") {
    console.log(props.data);
    text = props.data.ChildName;
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
