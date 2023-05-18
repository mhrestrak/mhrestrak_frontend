import React from "react";
import { Redirect } from "react-router-dom";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import { toast } from "react-toastify";
//@ts-ignore
import logo from "../images/logo.png";
const UserEmail = window.location.pathname.split("/")[2];

class ResetPassword extends Form {
  //@ts-ignore
  state = {
    data: { password: "" },
    errors: {},
  };

  schema = {
    password: Joi.string().required().label("New Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.resetPassword(data)
      return window.location = `/`;
    } catch (ex) {
      const errors = { ...this.state.errors };
      if (ex.response && ex.response.status === 400) {
        errors.data = ex.response.data;
        this.setState({ errors });
      } else {
        errors.message = ex.message;
        this.setState({ errors });
        toast.error(errors.message);
      }
    }
  };

  render() {
    return (
      <div className="loginContainer">
        <div className="container">
          <div className="box">
            <div className="imageCon">
              <img src={logo} className="image" width={"50%"} />
            </div>
            <div>Set New Password</div>
            <div className="container">
              <div className="box-input">
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("password", "New Password")}
                  {this.renderButton("Submit")}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
