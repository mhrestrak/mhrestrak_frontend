import Joi from "joi-browser";

export function getDrugsObject() {
  return [
    [
      {
        type: "input",
        typeName: "text",
        size: "grow2",
        name: "drugs_0_0_DrugOfChoice",
        label: "Drug Of Choice",
        value: undefined,
        schema: Joi.string().required().max(30),
      },
      {
        type: "date",
        size: "grow1",
        name: "drugs_0_1_LastDateOfUse",
        label: "Last Date Of Use",
        value: null,
        schema: Joi.date().allow(null),
      },
    ],
    [
      {
        type: "input",
        typeName: "text",
        size: "grow2",
        name: "drugs_1_0_MethodOfUse",
        label: "Method Of Use",
        value: undefined,
        schema: Joi.string().max(30),
      },
      {
        type: "input",
        typeName: "text",
        size: "grow2",
        name: "drugs_1_1_UseComment",
        label: "Use Comment",
        value: undefined,
        schema: Joi.string().max(50),
      },
      {
        type: "checkbox",
        size: "grow1",
        name: "drugs_1_2_PrimaryDrugOfChoice",
        label: "Primary Drug of Choice",
        value: false,
        schema: Joi.boolean(),
      },
    ],
  ];
}
