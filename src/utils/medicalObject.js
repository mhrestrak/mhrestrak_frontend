import Joi from "joi-browser";

export function getMedicalObject() {
  return [
    [
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "medical_0_0_Condition",
        label: "Condition",
        value: undefined,
        schema: Joi.string().max(50),
      },
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "medical_0_1_Treatment",
        label: "Treatment",
        value: undefined,
        schema: Joi.string().max(50),
      },
    ],
  ];
}
