import Joi from "joi-browser";

export function getResidentUpdateObject() {
  return [
    [
      {
        type: "input",
        typeName: "number",
        size: "grow1",
        name: "resident_0_0_RoomNum",
        label: "Room Number",
        value: undefined,
        schema: Joi.string().max(30),
      },
      {
        type: "select",
        size: "grow1",
        name: "resident_0_1_RecentPhase",
        label: "Phase",
        options : [
          {_id: "0", name: "0",value: "0"},
          {_id: "1", name: "1",value: "1"},
          {_id: "2", name: "2",value: "2"},
          {_id: "3", name: "3",value: "3"},
          {_id: "4", name: "4",value: "4"},
          {_id: "5", name: "5",value: "5"},
        ],
        value: undefined,
        schema: Joi.string().max(30).required(),
      },
    ],
    [
      {
        type: "yesNo",
        size: "grow1",
        name: "resident_1_0_IsActive",
        label: "Active",
        value: undefined,
        schema: Joi.boolean(),
      },
    ],
  ];
}
