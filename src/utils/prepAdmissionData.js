import uniqid from "uniqid";

export function prepAdmissionData(data, resID) {
  data.ResID = resID;
  data.AdmissionID = uniqid();
  return data;
}
