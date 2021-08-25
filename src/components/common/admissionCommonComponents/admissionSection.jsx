import React, { useState } from "react";
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
    </div>
  );
};

export default AdmissionSection;
