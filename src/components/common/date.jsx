import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  // DatePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

const Date = ({ name, label, error, value, ...rest }) => {
  console.log(value)
  if(typeof value === "string"){
    value = value.split('T')[0]
  }
  console.log(value)
  return (
    <div className="date">
      {label && <p className="date-label">{label}</p>}
      <div className="date-container">
        <div className="date-item">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* @ts-ignore */}
            <KeyboardDatePicker
              //   margin="normal"
              id={name}
              format="MM/dd/yyyy"
              // KeyboardButtonProps={{
              //   "aria-label": "change date",
              // }}
              clearable
              value={value}
              {...rest}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
      {error && <div className="alert alert-danger">{label+" must be a valid date"}</div>}
    </div>
  );
};

export default Date;
