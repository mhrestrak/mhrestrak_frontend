import uniqid from "uniqid";

export function prepAdmissionData(data, resID) {
  data.admission.ResID = resID;
  data.admission.AdmissionID = uniqid();

  let phaseData = [];

  let phase = data.admission.RecentPhase;
  phaseData.push({
    phase: phase,
    inDate: data.admission.GuestInDate,
  });
  if (phase) {
    if (phase !== "0") {
      phaseData.push({
        phase: "1",
        inDate: data.admission.ProgramInDate,
      });
      if (phase !== "1") {
        phaseData.push({
          phase: phase,
          inDate: new Date(),
        });
      }
    }
  }

  data.admission.PhaseData = JSON.stringify(phaseData);

  if (data.legal?.length > 0) {
    data.legal.forEach((legal, i) => {
      data.legal[i].ID = uniqid();
      data.legal[i].ResID = resID;
    });
  }
  return data;
}
