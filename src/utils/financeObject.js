import Joi from "joi-browser";

export function getFinanceObject() {
  return [
    [
      {
        type: "input",
        size: "grow1",
        typeName: "text",
        name: "finances_0_0_DebtName",
        label: "Debt Name",
        value: undefined,
        schema: Joi.string().max(30),
      },
      {
        type: "select",
        size: "grow1",
        name: "finances_0_1_DebtTypeListId",
        label: "Debt Type",
        options: [],
        value: undefined,
        schema: Joi.string().max(30).required(),
      },
      {
        type: "input",
        size: "grow1",
        typeName: "number",
        name: "finances_0_2_DebtAmount",
        label: "Debt Amount",
        value: undefined,
        schema: Joi.number(),
      },
    ],
  ];
}
