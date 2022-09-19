import Joi from "joi-browser";

export function getPhaseChangeObject() {
  return [
    [
        {
          type: "select",
          size: "grow1",
          name: "phaseChange_0_0_phase",
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
        {
            type: "date",
            size: "grow1",
            name: "phaseChange_0_1_TransitionDate",
            label: "Transition Date",
            value: null,
            schema: Joi.date().required(),
          },
    ]
  ];
}