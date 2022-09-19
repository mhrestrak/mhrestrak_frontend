import Joi from "joi-browser";

export function getResidentUpdateObject() {
  return [
    [
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "resident_0_0_ResFirstName",
        label: "First Name",
        value: undefined,
        schema: Joi.string().required().max(30),
      },
      {
        type: "input",
        size: "grow1",
        typeName: "text",
        name: "resident_0_1_ResLastName",
        label: "Last Name",
        value: undefined,
        schema: Joi.string().required().max(30),
      },],[
      {
        type: "input",
        size: "grow1",
        typeName: "text",
        name: "resident_1_0_SSN",
        label: "SSN",
        value: undefined,
        schema: Joi.string().required().max(12),
      },
      {
        type: "input",
        size: "grow1",
        typeName: "text",
        name: "resident_1_1_ResPhoneNumber",
        label: "Phone number",
        value: undefined,
        schema: Joi.string().max(30),
      },],[
      {
        type: "input",
        size: "grow3",
        typeName: "text",
        name: "resident_2_0_ResEmailAddr",
        label: "Email Address",
        value: undefined,
        schema: Joi.string().email().max(60),
      },
      {
        type: "checkbox",
        size: "grow1",
        name: "resident_2_1_IsPregnant",
        label: "Is Pregnant",
        value: false,
        schema: Joi.boolean(),
      },],[
      {
        type: "checkbox",
        size: "grow1",
        name: "resident_3_0_IsChurchAttender",
        label: "Church Attender?",
        value: false,
        schema: Joi.boolean(),
      },
      {
        type: "checkbox",
        size: "grow1",
        name: "resident_3_1_IsEmployed",
        label: "Is Employed",
        value: false,
        schema: Joi.boolean(),
      },
    ]
  ];
}

// export function getResidentUpdateObject() {
//   return [
//     [
//       {
//         type: "input",
//         typeName: "text",
//         size: "grow1",
//         name: "resident_0_0_RoomNum",
//         label: "Room Number",
//         value: undefined,
//         schema: Joi.string().max(30),
//       },
//       {
//         type: "select",
//         size: "grow1",
//         name: "resident_0_1_RecentPhase",
//         label: "Phase",
//         options : [
//           {_id: "0", name: "0",value: "0"},
//           {_id: "1", name: "1",value: "1"},
//           {_id: "2", name: "2",value: "2"},
//           {_id: "3", name: "3",value: "3"},
//           {_id: "4", name: "4",value: "4"},
//           {_id: "5", name: "5",value: "5"},
//         ],
//         value: undefined,
//         schema: Joi.string().max(30).required(),
//       },
//     ]
//   ];
// }
