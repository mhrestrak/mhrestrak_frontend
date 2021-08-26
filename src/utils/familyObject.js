import Joi from "joi-browser";

export function getFamilyObject() {
  return [
    [
      {
        type: "input",
        typeName: "text",
        size: "grow2",
        name: "family_0_0_ChildName",
        label: "Child Name",
        value: undefined,
        schema: Joi.string().max(30).required(),
      },
      {
        type: "date",
        size: "grow1",
        name: "family_0_1_ChildDob",
        label: "Child DOB",
        value: null,
        schema: Joi.date(),
      },
      {
        type: "input",
        typeName: "number",
        size: "grow2",
        name: "family_0_2_ChildSupportAmount",
        label: "Child Support Amount",
        value: undefined,
        schema: Joi.number().max(30),
      },
    ],
    [
      {
        type: "checkbox",
        size: "grow1",
        name: "family_1_0_ChildInHouseFlag",
        label: "Child In House",
        value: false,
        schema: Joi.boolean(),
      },
      {
        type: "checkbox",
        size: "grow1",
        name: "family_1_1_IsPregnant",
        label: "Is Pregnant",
        value: false,
        schema: Joi.boolean(),
      },
    ],
    [
      {
        type: "checkbox",
        size: "grow1",
        name: "family_2_0_ChildInHouseFlag",
        label: "Child In House",
        value: false,
        schema: Joi.boolean(),
      },
      {
        type: "checkbox",
        size: "grow1",
        name: "family_2_1_PaysChildSupport",
        label: "Pays Child Support",
        value: false,
        schema: Joi.boolean(),
      },
    ],
  ];
}
