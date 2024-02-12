import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  // DatePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

const Date1 = ({ name, label, error, value, ...rest }) => {
  if(typeof value === "string") value = value.split('T')[0]
  
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
              // onChange={(data) => {
              //   if(data !== null){
              //     if(data?.toString() !== "Invalid Date"){
              //       return onChange(`${data.getFullYear()}-${data.getMonth()+1}-${data.getDate()}`)
              //       let year = data.getFullYear() === data.getUTCFullYear() ? data.getFullYear() : data.getFullYear() + 1
              //       let date = data.getDate() === data.getUTCDate() ? data.getDate() : data.getDate() + 1
              //       let month = data.getMonth() === data.getUTCMonth() ? data.getMonth() : data.getMonth() + 1
              //       // console.log(data.getDate(), data.getMonth(), data.getFullYear(), data.toISOString().split('T')[0], "dddddddd")
              //       onChange(new Date(year, month, date).to)
              //     }
              //   }
              // }
              
            // }
              {...rest}
            />
          </MuiPickersUtilsProvider>
        </div>
      </div>
      {error && <div className="alert alert-danger">{label+" must be a valid date"}</div>}
    </div>
  );
};

export default Date1;
