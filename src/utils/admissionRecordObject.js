import Joi from "joi-browser";

export function getAdmissionRecordobject() {
  return [
    [
      {
        type: "date",
        size: "grow1",
        name: "admission_0_0_GuestInDate",
        label: "Guest In Date",
        value: null,
        schema: Joi.date().required(),
      },
      {
        type: "date",
        size: "grow1",
        name: "admission_0_1_ProgramInDate",
        label: "Program In Date",
        value: null,
        schema: Joi.date().allow(null),
      },
      {
        type: "date",
        size: "grow1",
        name: "admission_0_2_EstMoveOutDate",
        label: "Est Move Out Date",
        value: null,
        schema: Joi.date().allow(null),
      }],[
        {
          type: "input",
          typeName: "text",
          size: "grow1",
          name: "admission_1_0_WhoReferred",
          label: "Who Referred",
          value: undefined,
          schema: Joi.string().max(30),
        },
      {
        type: "select",
        size: "grow1",
        name: "admission_1_1_RecentPhase",
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
      }
    ],
    [
      {
        type: "yesNo",
        size: "grow1",
        name: "admission_2_0_HasMentalHealthChallanges",
        label: "Has Mental Health Challanges?",
        value: undefined,
        schema: Joi.boolean(),
      },
      {
        type: "yesNo",
        size: "grow1",
        name: "admission_2_1_WasDomesticallyAbused",
        label: "Was Domestically Abused?",
        value: undefined,
        schema: Joi.boolean(),
      },
      {
        type: "yesNo",
        size: "grow1",
        name: "admission_2_2_WasHomeless",
        label: "Was Homeless?",
        value: undefined,
        schema: Joi.boolean(),
      },
      {
        type: "yesNo",
        size: "grow1",
        name: "admission_2_3_WasJobless",
        label: "Was Jobless?",
        value: undefined,
        schema: Joi.boolean(),
      },
    ],
    [
      {
        type: "yesNo",
        size: "grow1",
        name: "admission_3_0_IsRestricted",
        label: "Is Restricted?",
        value: true,
        schema: Joi.boolean(),
      },
      {
        type: "yesNo",
        size: "grow1",
        name: "admission_3_1_IsApprovedPartner",
        label: "Is Approved Partner?",
        value: false,
        schema: Joi.boolean(),
      },
      {
        type: "yesNo",
        size: "grow1",
        name: "admission_3_2_IsApprovedBabySitter",
        label: "Is Approved Baby Sitter?",
        value: undefined,
        schema: Joi.boolean(),
      },
      {
        type: "yesNo",
        size: "grow1",
        name: "admission_3_3_CanSelfSignout",
        label: "Can Self Signout?",
        value: false,
        schema: Joi.boolean(),
      },
    ],[
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "admission_4_0_TimesCompletedTreatment",
        label: "Times Completed Treatment",
        value: undefined,
        schema: Joi.string(),
      },
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "admission_4_1_PreviousInpatientAttempts",
        label: "Previous Inpatient Attempts",
        value: undefined,
        schema: Joi.string(),
      },
    ],
    [
      {
        type: "input",
        typeName: "text",
        size: "grow2",
        name: "admission_5_0_RoomNum",
        label: "Room Num",
        value: undefined,
        schema: Joi.string().max(30),
      },
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "admission_5_1_CaseWorkerName",
        label: "CaseWorker Name",
        value: undefined,
        schema: Joi.string().max(30),
      },
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "admission_5_2_IntakeCoordinatorName",
        label: "IntakeCoordinator Name",
        value: undefined,
        schema: Joi.string().required().max(30),
      },
    ],[
    {
        type: "date",
        size: "grow1",
        name: "admission_6_0_DateOut",
        label: "Date Out",
        value: null,
        schema: Joi.date(),
      },
      {
        type: "date",
        size: "grow1",
        name: "admission_6_1_PossessionsRemovedDate",
        label: "Possessions Removed Date",
        value: null,
        schema: Joi.date().allow(null),
      },
    ],
    [
      {
        type: "textBox",
        typeName: "text",
        size: "grow1",
        name: "admission_7_0_ReasonForLeaving",
        label: "Reason for Leaving",
        value: undefined,
        schema: Joi.string().required(),
      },
    ],
    [
      {
        type: "textBox",
        typeName: "text",
        size: "grow1",
        name: "admission_8_0_DischargeLocation",
        label: "Discharge Location",
        value: undefined,
        schema: Joi.string().required(),
      },
      {
        type: "yesNo",
        size: "grow1",
        name: "admission_8_1_BlockFromReentry",
        label: "Block From Re-entry",
        value: undefined,
        schema: Joi.boolean(),
      },
      {
        type: "yesNo",
        size: "grow1",
        name: "admission_9_2_LeftVolunteerly",
        label: "Left Volunteerly",
        value: undefined,
        schema: Joi.boolean(),
      },
    ],
    [
      {
        type: "textBox",
        typeName: "text",
        size: "grow2",
        name: "admission_10_0_UnresolvedIssues",
        label: "Unresolved Issues",
        value: undefined,
        schema: Joi.string().max(200),
      }],[
      {
        type: "textBox",
        typeName: "text",
        size: "grow2",
        name: "admission_11_0_ReadmitConditions",
        label: "Readmit Conditions",
        value: undefined,
        schema: Joi.string().max(200),
      },
    ],
    [
      {
        type: "textBox",
        typeName: "text",
        size: "grow1",
        name: "admission_12_0_ExitNotes",
        label: "Other Exit Notes",
        value: undefined,
        schema: Joi.string().max(200),
      },
    ],
  ];
}







