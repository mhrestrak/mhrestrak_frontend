import React from "react";
import InputFieldLayoutRow from "../inputFieldLayoutRow";

const AdmissionSection = (props) => {
  return (
    <div className="createResident-Container-formSection">
      {props.data.map((row, i) => (
        <InputFieldLayoutRow
          key={i.toString()}
          data={row}
          onChange={props.onChange}
        />
      ))}
      <div className="createResident-Container-endSection">
        <h4 className="form-pagination">{props.paginate}</h4>
      </div>
      <div className="createResident-Container-endSection">
        <div className="createResident-Container-formSection-rowItem-nextButton">
          {props.toPreviousSection && (
            <button
              className="formSection-rowItem-nextButton button"
              onClick={props.toPreviousSection}
            >
              Previous
            </button>
          )}
          {props.toNextSection && (
            <button
              className="formSection-rowItem-nextButton button"
              onClick={props.toNextSection}
            >
              Next
            </button>
          )}
          {props.submitWholeForm && (
            <button
              className="formSection-rowItem-nextButton button"
              onClick={props.submitWholeForm}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmissionSection;
