import Joi from "joi-browser";
// import { getStatesOfCountry } from "../services/dropdownLocationService";

export function getLegalobject() {
  return [
    [
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "legal_0_0_ProbationCounty",
        label: "Probation County",
        value: undefined,
        schema: Joi.string().max(50),
      },
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "legal_0_1_ProbationOfficer",
        label: "Probation Officer",
        value: undefined,
        schema: Joi.string().max(50),
      },
    ],[
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "legal_1_0_Contact",
        label: "Probation/Parole Contact",
        value: undefined,
        schema: Joi.string().max(50),
      },
      {
        type: "yesNo",
        size: "grow1",
        name: "legal_1_1_CommunityServiceRqd",
        label: "Community Service Rqd?",
        value: undefined,
        schema: Joi.boolean(),
      },
    ],
    [
      {
        type: "yesNo",
        size: "grow1",
        name: "legal_2_0_RestitutionFinesRqd",
        label: "Restitution Fines Rqd?",
        value: undefined,
        schema: Joi.boolean(),
      },
      {
        type: "yesNo",
        size: "grow1",
        name: "legal_2_1_IsCourtCasesPending",
        label: "Court Cases Pending",
        value: undefined,
        schema: Joi.boolean(),
      },
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "legal_2_2_CourtCasesPending",
        label: "Number of Court Cases Pending",
        value: undefined,
        schema: Joi.string().max(50),
      },
    ],
    [
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "legal_3_0_CPSActiveCases",
        label: "CPS Active Cases",
        value: undefined,
        schema: Joi.string().max(50),
      },
    ],
    [
      {
        type: "yesNo",
        size: "grow1",
        name: "legal_4_0_OnParole",
        label: "On Parole",
        value: undefined,
        schema: Joi.boolean(),
      },
      {
        type: "yesNo",
        size: "grow1",
        name: "legal_4_1_ROIFilledOut",
        label: "ROI filled out",
        value: undefined,
        schema: Joi.boolean(),
      }
    ]
  ];
}

// export function getLegalobject() {
//   return [
//     [
//       {
//         type: "input",
//         typeName: "text",
//         size: "grow1",
//         name: "legal_0_0_CaseNumber",
//         label: "Case Number",
//         value: undefined,
//         schema: Joi.string().max(30),
//       },
//       {
//         type: "input",
//         typeName: "text",
//         size: "grow1",
//         name: "legal_0_1_ChargesSummary",
//         label: "Charges Summary",
//         value: undefined,
//         schema: Joi.string().max(50),
//       },
//       {
//         type: "input",
//         typeName: "text",
//         size: "grow1",
//         name: "legal_0_2_ChargeLevel",
//         label: "Charge Level",
//         value: undefined,
//         schema: Joi.string().max(30),
//       },
//       {
//         type: "input",
//         typeName: "text",
//         size: "grow1",
//         name: "legal_0_3_CaseName",
//         label: "Case Name",
//         value: undefined,
//         schema: Joi.string().max(50),
//       },
//     ],
//     [
//       {
//         type: "input",
//         typeName: "text",
//         size: "grow1",
//         name: "legal_1_0_CaseCounty",
//         label: "Case County",
//         value: undefined,
//         schema: Joi.string().max(50),
//       },
//       {
//         type: "input",
//         typeName: "text",
//         size: "grow1",
//         name: "legal_1_1_ParoleState",
//         label: "Parole State",
//         value: undefined,
//         schema: Joi.string().max(50),
//       },
//       {
//         type: "input",
//         typeName: "text",
//         size: "grow1",
//         name: "legal_1_2_ProbationCounty",
//         label: "Probation County",
//         value: undefined,
//         schema: Joi.string().max(50),
//       },
//       {
//         type: "input",
//         typeName: "text",
//         size: "grow1",
//         name: "legal_1_3_ProbationOfficer",
//         label: "Probation Officer",
//         value: undefined,
//         schema: Joi.string().max(50),
//       },
//     ],
//     [
//       {
//         type: "date",
//         size: "grow1",
//         name: "legal_2_0_WarrantDate",
//         label: "Warrant Date",
//         value: null,
//         schema: Joi.date().allow(null),
//       },
//       {
//         type: "select",
//         size: "grow1",
//         name: "legal_2_1_WarrantState",
//         label: "Warrant State",
//         options: [],
//         value: undefined,
//         schema: Joi.string().max(50),
//       },
//       {
//         type: "input",
//         typeName: "text",
//         size: "grow1",
//         name: "legal_2_2_WarrantCounty",
//         label: "Warrant County",
//         value: undefined,
//         schema: Joi.string().max(50),
//       },
//     ],
//     [
//       {
//         type: "input",
//         typeName: "text",
//         size: "grow2",
//         name: "legal_3_0_Contact",
//         label: "Contact",
//         value: undefined,
//         schema: Joi.string().max(50),
//       },
//       {
//         type: "yesNo",
//         size: "grow1",
//         name: "legal_3_1_CustodySuit",
//         label: "Custody Suit?",
//         value: undefined,
//         schema: Joi.boolean(),
//       },
//       {
//         type: "yesNo",
//         size: "grow1",
//         name: "legal_3_2_CivilSuit",
//         label: "Civil Suit?",
//         value: undefined,
//         schema: Joi.boolean(),
//       },
//       {
//         type: "yesNo",
//         size: "grow1",
//         name: "legal_3_3_CommunityServiceRqd",
//         label: "Community Service Rqd?",
//         value: undefined,
//         schema: Joi.boolean(),
//       },
//     ],
//     [
//       {
//         type: "yesNo",
//         size: "grow1",
//         name: "legal_4_0_RestitutionFinesRqd",
//         label: "Restitution Fines Rqd?",
//         value: undefined,
//         schema: Joi.boolean(),
//       },
//       {
//         type: "yesNo",
//         size: "grow1",
//         name: "legal_4_1_NeedCourtApproval",
//         label: "Need Court Approval?",
//         value: undefined,
//         schema: Joi.boolean(),
//       },
//       {
//         type: "yesNo",
//         size: "grow1",
//         name: "legal_4_2_ActiveWarrant",
//         label: "Active Warrant?",
//         value: undefined,
//         schema: Joi.boolean(),
//       },
//       {
//         type: "yesNo",
//         size: "grow1",
//         name: "legal_4_3_OnProbation",
//         label: "On Probation?",
//         value: undefined,
//         schema: Joi.boolean(),
//       },
//     ],
//   ];
// }
