import uniqid from "uniqid";

export function prepAdmissionData(data, resID) {
  data.admission.ResID = resID;
  data.admission.AdmissionID = uniqid();
  data.admission.PhaseData = JSON.stringify(
    [
      {
        phase : data.admission.RecentPhase, 
        inDate : data.admission.ProgramInDate
      }
    ]
  )
  if (data.legal.length > 0) {
    data.legal.forEach((legal, i) => {
      data.legal[i].ID = uniqid();
      data.legal[i].ResID = resID;
    });
  }
  return data;
}
