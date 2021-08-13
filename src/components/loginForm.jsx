import React from "react";
import { Redirect } from "react-router-dom";
import auth from "../services/authService";
import Joi, { errors } from "joi-browser";
import Form from "./common/form";
import { toast } from "react-toastify";

class loginForm extends Form {
  state = {
    data: { email: "", pass: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    pass: Joi.string().required().label("password"),
  };

  doSubmit = async () => {
    try {
      console.log("submit");
      const { data } = this.state;
      await auth.login(data.email, data.pass);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/dashboard";
    } catch (ex) {
      const errors = { ...this.state.errors };
      if (ex.response && ex.response.status === 400) {
        console.log(errors);
        errors.data = ex.response.data;
        this.setState({ errors });
      } else {
        console.log(ex);
        console.log("asd");
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
            <h1 className="display-1">Welcome to MHM</h1>
            <div className="container">
              <div className="box-input">
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("email", "Email")}
                  {this.renderInput("pass", "Password", "password")}
                  {this.renderButton("Login")}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default loginForm;
