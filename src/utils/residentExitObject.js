import Joi from "joi-browser";
import { getList } from "../services/listService";

export async function getResidentExitObject() {
  let reasonForLeaving = await getList(9);
  let dischargeLocations = await getList(10);
  return [
    [
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "exit_0_0_WhoReferred",
        label: "Who Referred",
        value: undefined,
        schema: Joi.string().max(30),
      },
      {
        type: "select",
        size: "grow1",
        name: "exit_0_1_ReasonForLeaving",
        label: "Reason for Leaving",
        options: reasonForLeaving,
        value: undefined,
        schema: Joi.string().required(),
      },
    ],
    [
      {
        type: "date",
        size: "grow1",
        name: "exit_1_0_GuestInDate",
        label: "Guest In Date",
        value: null,
        schema: Joi.date(),
      },
      {
        type: "date",
        size: "grow1",
        name: "exit_1_1_DateOut",
        label: "Date Out",
        value: null,
        schema: Joi.date(),
      },
      {
        type: "date",
        size: "grow1",
        name: "exit_1_2_PossessionsRemovedDate",
        label: "Possessions Removed Date",
        value: null,
        schema: Joi.date(),
      },
    ],
    [
      {
        type: "select",
        size: "grow1",
        name: "exit_2_0_DischargeLocation",
        label: "Discharge Location",
        options: dischargeLocations,
        value: undefined,
        schema: Joi.string().required(),
      },
      {
        type: "yesNo",
        size: "grow1",
        name: "exit_2_1_BlockFromReentry",
        label: "Block From Re-entry",
        value: undefined,
        schema: Joi.boolean(),
      },
      {
        type: "yesNo",
        size: "grow1",
        name: "exit_2_2_LeftVolunteerly",
        label: "Left Volunteerly",
        value: undefined,
        schema: Joi.boolean(),
      },
    ],
    [
      {
        type: "input",
        typeName: "text",
        size: "grow2",
        name: "exit_3_0_UnresolvedIssues",
        label: "Unresolved Issues",
        value: undefined,
        schema: Joi.string().max(30),
      },
      {
        type: "input",
        typeName: "text",
        size: "grow2",
        name: "exit_3_1_ReadmitConditions",
        label: "Readmit Conditions",
        value: undefined,
        schema: Joi.string().max(30),
      },
    ],
    [
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "exit_4_0_ExitNotes",
        label: "Exit Notes",
        value: undefined,
        schema: Joi.string().max(200),
      },
    ],
  ];
}






