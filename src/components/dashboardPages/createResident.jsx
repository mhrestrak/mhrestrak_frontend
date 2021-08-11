import React, { Component } from "react";
import Joi, { errors } from "joi-browser";
import { toast } from "react-toastify";

class CreateResident extends Component {
  state = {
    data: { email: "", pass: "" },
    errors: {},
  };

  doSubmit = async () => {};

  render() {
    return (
      <div className="loginContainer">
        <div className="container">
          <div className="box">
            <h1 className="display-1">Welcome MHM</h1>
            <div className="container">
              <div className="box-input"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateResident;
