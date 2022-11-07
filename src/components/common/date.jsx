import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  // DatePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

const Date = ({ name, label, error, ...rest }) => {
  return (
    <div className="date">
      <p className="date-label">{label}</p>
      <div className="date-container">
        <div className="date-item">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {/* @ts-ignore */}
            <KeyboardDatePicker
              //   margin="normal"
              id={name}
              format="mm/dd/yyyy"
              // KeyboardButtonProps={{
              //   "aria-label": "change date",
              // }}
              clearable
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
