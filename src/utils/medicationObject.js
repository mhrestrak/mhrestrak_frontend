import Joi from "joi-browser";

export function getMedicationObject() {
  return [
    [
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "medication_0_0_MedicationName",
        label: "Medication Name",
        value: undefined,
        schema: Joi.string().required().max(30),
      },
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "medication_0_1_Dosage",
        label: "Dosage",
        value: undefined,
        schema: Joi.string().max(50),
      },
    ],
    [
      {
        type: "date",
        size: "grow1",
        name: "medication_1_0_StartDate",
        label: "Start Date",
        value: null,
        schema: Joi.date(),
      },
      {
        type: "date",
        size: "grow1",
        name: "medication_1_1_EndDate",
        label: "End Date",
        value: null,
        schema: Joi.date(),
      },
      {
        type: "input",
        typeName: "number",
        size: "grow1",
        name: "medication_1_2_TimesPerDay",
        label: "Times Per Day",
        value: undefined,
        schema: Joi.string().max(50),
      },
    ],
    [
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "medication_2_0_PrescriberBusinessName",
        label: "Prescriber Business Name",
        value: undefined,
        schema: Joi.string().max(50),
      },
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "medication_2_1_InsuranceName",
        label: "Insurance Name",
        value: undefined,
        schema: Joi.string().max(50),
      },
    ],
  ];
}
