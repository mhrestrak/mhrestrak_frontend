import Joi from "joi-browser";

export function getMedicalObject() {
  return [
    [
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "medical_0_0_Illness",
        label: "Illness",
        value: undefined,
        schema: Joi.string().max(1024),
      },
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "medical_0_1_Allergy",
        label: "Allergy",
        value: undefined,
        schema: Joi.string(),
      },
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "medical_0_2_MedicalRestrictions",
        label: "Medical Restrictions",
        value: undefined,
        schema: Joi.string().max(1024),
      },
    ],
  ];
}
