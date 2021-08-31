import React from "react";

const YesNo = ({ name, label, error, onChange, value }) => {
  return (
    <div className="yesNo-container">
      <label htmlFor={name} className={"inputLabel"}>
        {label}
      </label>
      <div className={"yesNo-container-options"}>
        <div
          onClick={() => onChange(true)}
          className={
            value === true
              ? "yesNo-container-options-item-selected"
              : "yesNo-container-options-item-unselected"
          }
        >
          Yes
        </div>
        <div
          onClick={() => onChange(false)}
          className={
            value === false
              ? "yesNo-container-options-item-selected"
              : "yesNo-container-options-item-unselected"
          }
        >
          No
        </div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default YesNo;
