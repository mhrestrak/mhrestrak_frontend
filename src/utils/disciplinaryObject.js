import Joi from "joi-browser";

export function geDisciplinaryObject() {
  return [
    [
      {
        type: "select",
        size: "grow1",
        name: "disciplinary_0_0_reason",
        options : [],
        label: "Disciplinary Reason",
        value: undefined,
        schema: Joi.string().required(),
      },
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "disciplinary_0_1_comment",
        label: "Comment",
        value: undefined,
        schema: Joi.string().required(),
      }
    ],
  ];
}
