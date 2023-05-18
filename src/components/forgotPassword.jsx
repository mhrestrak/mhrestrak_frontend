import React from "react";
import { Redirect } from "react-router-dom";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import { toast } from "react-toastify";
//@ts-ignore
import logo from "../images/logo.png"
import { getCode } from "../services/twillioVerification";
class ForgotPassword extends Form {
  //@ts-ignore
  state = {
    data: { email: ""},
    errors: {},
    err : "",
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      let result = await getCode({email: data.email});
      if(result.data.error){
        return this.setState({err : result.data.error})
      }
      return window.location = `/verifyOTP/${data.email}`;
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
            <h1 className="display-4">Recover Account</h1>
            <div className="container">
              <div className="box-input">
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("email", "Email")}
                  {/* {this.renderSelect("pass", "Password", "password")} */}
                  {this.renderButton("Send OTP")}
                </form>

                {this.state.err &&
                <div className="centerBox">{this.state.err}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
