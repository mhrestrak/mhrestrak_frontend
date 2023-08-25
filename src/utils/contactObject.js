import Joi from "joi-browser";
// import { getStatesOfCountry } from "../services/dropdownLocationService";

export function getContactObject() {
  return [
    [
      {
        type: "select",
        size: "grow1",
        typeName: "text",
        name: "contact_0_0_ContactTypeId",
        label: "Contact Type",
        options: [],
        value: undefined,
        schema: Joi.string(),
      },
      {
        type: "input",
        size: "grow1",
        typeName: "text",
        name: "contact_0_1_ContactFirstName",
        label: "First Name",
        value: undefined,
        schema: Joi.string().max(30),
      },
      {
        type: "input",
        size: "grow1",
        typeName: "text",
        name: "contact_0_2_ContactLastName",
        label: "Last Name",
        value: undefined,
        schema: Joi.string().max(30),
      },
    ],
    [
      {
        type: "input",
        size: "grow1",
        typeName: "text",
        name: "contact_1_0_Email",
        label: "Email",
        value: undefined,
        schema: Joi.string().email().max(60),
      },
      {
        type: "input",
        size: "grow1",
        typeName: "text",
        name: "contact_1_1_Phone",
        label: "Phone Number",
        value: undefined,
        schema: Joi.string().max(15),
      },
    ],
    [
      {
        type: "input",
        size: "grow1",
        typeName: "text",
        name: "contact_2_0_Address",
        label: "Address",
        value: undefined,
        schema: Joi.string().max(50),
      },
      {
        type: "input",
        size: "grow1",
        typeName: "text",
        name: "contact_2_1_EmergencyRelationship",
        label: "Emergency Relationship",
        value: undefined,
        schema: Joi.string().max(30),
      },
    ],
    [
      {
        type: "select",
        size: "grow1",
        name: "contact_3_0_State",
        label: "State",
        options: [],
        // options: [],
        value: undefined,
        schema: Joi.string().max(70),
      },
      {
        type: "input",
        size: "grow1",
        name: "contact_3_1_City",
        label: "City",
        value: undefined,
        schema: Joi.string().max(70),
      },
      {
        type: "input",
        size: "grow1",
        typeName: "text",
        name: "contact_3_2_ZipCode",
        label: "Zip Code",
        value: undefined,
        schema: Joi.string().max(10),
      },
    ],
  ];
}