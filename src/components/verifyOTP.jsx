import React from "react";
import { Redirect } from "react-router-dom";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import { toast } from "react-toastify";
//@ts-ignore
import logo from "../images/logo.png"
import { getCode, verifyCode } from "../services/twillioVerification";
const UserEmail = window.location.pathname.split("/")[2];

class VerifyOTP extends Form {
  //@ts-ignore
  state = {
    data: { otp: ""},
    errors: {},
    stage : 1
  };

  schema = {
    otp: Joi.string().required().label("OTP"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      let verification = await verifyCode({email: UserEmail, code : data.otp});
      if(verification.data.status === "approved") {
        console.log("verified!", verification.data)
        auth.loginWithJwt(verification.data.jwt)
        return window.location = `/resetPassword`;
    }
      toast.error("Invalid OTP");
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
    if (auth.getCurrentUser()) return <Redirect to="/dashboard" />;

    return (
      <div className="loginContainer">
        <div className="container">
          <div className="box">
            <div className="imageCon"><img src={logo} className="image" width={"50%"}/></div>
            <div>OTP Sent to {UserEmail}</div>
            <div className="container">
              <div className="box-input">
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("otp", "OTP")}
                  {/* {this.renderSelect("pass", "Password", "password")} */}
                  {this.renderButton("Verify OTP")}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VerifyOTP;
