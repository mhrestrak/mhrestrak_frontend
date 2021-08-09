import React from 'react';
import { Redirect } from "react-router-dom"
import auth from "../services/authService"
import Joi from "joi-browser"
import Form from "./common/form"

class LoginForm extends Form {

    state = {
        data: { email: "", password: "" },
        errors: {}
    }

    schema = {
        email: Joi.string().required().email().label("Email"),
        password: Joi.string().required().label("password")
    }

    doSubmit = async () => {
        try {

        } catch (ex) {

        }
    }
    // return (
    //     <div>

    //     </div>
    // );
}

export default loginForm;