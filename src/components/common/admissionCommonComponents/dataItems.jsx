import React from "react";

const DataItems = (props) => {

  let text = "";
  if (props.sectionName === "family") {
    text = props.data.ChildName;
  } else if (props.sectionName === "education") {
    console.log(props.list)
    console.log(props.data)
    props.list.forEach((item) =>{
      if(item.value == props.data.EducationLevel){
        text = item.name;
      }
    })
    if(!text) text = props.data.EducationLevel;
  } else if (props.sectionName === "drugs") {
    text = "Drug item " + props.data.DrugOfChoice;
  } else if (props.sectionName === "legal") {
    text = "Case Number " + (props.data.CaseNumber);
  } else if (props.sectionName === "finances") {
    text = "Finance Item " + (props.index + 1) + " - " + props.data.DebtName;
  } else if (props.sectionName === "medical") {
    text = props.data.Condition
  } else if (props.sectionName === "medication") {
    text = props.data.MedicationName
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
