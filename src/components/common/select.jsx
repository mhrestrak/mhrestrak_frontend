import React from "react";

const Select = ({ name, label, options, error,noClear, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className={"inputLabel"}>
        {label}
      </label>
      <select name={name} id={name} {...rest} className="form-control">
        {!noClear && <option value="" key="0" />}
        {options.map((option) => (
          <option
            key={option._id}
            value={option.value ? option.value : option.name}
          >
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
