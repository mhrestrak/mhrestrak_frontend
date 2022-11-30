import Joi from "joi-browser";

export function getNoteCreationObject() {
  return [
    [
      {
        type: "select",
        size: "grow1",
        name: "note_0_0_NoteCategoryListID",
        label: "Note Category",
        options: [],
        value: undefined,
        schema: Joi.string().max(30).required(),
      },
    ],
    [
      {
        type: "input",
        typeName: "text",
        size: "grow1",
        name: "note_1_0_NoteSubject",
        label: "Subject",
        value: undefined,
        schema: Joi.string().max(30).required(),
      },
    ],
    [
      {
        type: "textBox",
        typeName: "text",
        size: "grow2",
        name: "note_2_0_Note",
        label: "Note",
        value: undefined,
        schema: Joi.string().required(),
      },
    ],
  ];
}

