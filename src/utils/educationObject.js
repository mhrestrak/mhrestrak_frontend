import Joi from "joi-browser";
export function getEducationObject() {
  return [
    [
      {
        type: "select",
        size: "grow1",
        name: "education_0_0_EducationLevel",
        label: "Education Level",
        options: [],
        value: undefined,
        schema: Joi.string().required().max(30),
      },
      // {
      //   type: "input",
      //   typeName: "text",
      //   size: "grow2",
      //   name: "education_0_1_EducationName",
      //   label: "Education Name",
      //   value: undefined,
      //   schema: Joi.string().required().max(30),
      // },
    ],
  ];
}
