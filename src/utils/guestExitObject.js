import Joi from "joi-browser";

export function getGuestExitobject() {
  return [
    [
      {
        type: "date",
        size: "grow1",
        name: "guestExit_0_0_GuestInDate",
        label: "Guest In Date",
        value: null,
        schema: Joi.date(),
      },
      {
        type: "date",
        size: "grow1",
        name: "guestExit_0_1_DateOut",
        label: "Date Out",
        value: null,
        schema: Joi.date(),
      },
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "guestExit_0_2_IntakeCoordinatorName",
        label: "Discharged by",
        value: undefined,
        schema: Joi.string().required().max(30),
      },
    ],
  ];
}
