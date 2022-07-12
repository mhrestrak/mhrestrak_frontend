import React from "react";

const TextArea = ({ name, label, error, showLabel, ...rest }) => {
  return (
    <div className="form-group">
      {showLabel && (
        <label htmlFor={name} className={"inputLabel"}>
          {label}
        </label>
      )}
      <textarea
        {...rest}
        autoFocus
        id={name}
        name={name}
        className="form-control"
        placeholder={showLabel ? undefined : label}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextArea;
