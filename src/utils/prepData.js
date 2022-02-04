import uniqid from "uniqid";

export function prepData(data) {
  let ResID = uniqid();
  if (data.basic) {
    data.basic.ResID = ResID;
    data.basic.IsActive = false;
    data.basic.RecentPhase = "0";
  }
  if (data.family.length > 0) {
    data.family.forEach((family, i) => {
      data.family[i].ID = uniqid();
      data.family[i].ResID = ResID;
    });
  }
  if (data.contact.ContactFirstName) {
    data.contact.ResID = ResID;
    data.contact.ID = uniqid();
    data.contact.ContactTypeId = "131";
  }
  if (data.notes.NoteCategoryListID) {
    data.notes.ResID = ResID;
    data.notes.ID = uniqid();
    data.notes.NoteDateTime = new Date();
  }
  if (data.education.length > 0) {
    data.education.forEach((educ, i) => {
      data.education[i].ID = uniqid();
      data.education[i].ResID = ResID;
    });
  }
  if (data.employment.JobTitle) {
    data.employment.ResID = ResID;
    data.employment.ID = uniqid();
  }
  if (data.drugs.length > 0) {
    data.drugs.forEach((drugs, i) => {
      data.drugs[i].ID = uniqid();
      data.drugs[i].ResID = ResID;
    });
  }
  if (data.legal.length > 0) {
    data.legal.forEach((legal, i) => {
      data.legal[i].ID = uniqid();
      data.legal[i].ResID = ResID;
    });
  }
  if (data.finances.length > 0) {
    data.finances.forEach((finance, i) => {
      data.finances[i].ID = uniqid();
      data.finances[i].ResID = ResID;
    });
  }
  if (data.medical.length > 0) {
    data.medical.forEach((medical, i) => {
      data.medical[i].ID = uniqid();
      data.medical[i].ResID = ResID;
    });
  }
  if (data.medication.length > 0) {
    data.medication.forEach((medication, i) => {
      data.medication[i].ID = uniqid();
      data.medication[i].ResID = ResID;
    });
  }

  return data;
}
