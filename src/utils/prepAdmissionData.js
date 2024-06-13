import uniqid from "uniqid";

export function prepAdmissionData(data, resID) {
  data.admission.ResID = resID;
  data.admission.AdmissionID = uniqid();

  let phaseData = [];

  let phase = data.admission.RecentPhase;

  let stage2AndAboveDate = new Date()
  if(phase !== 0){
    phaseData.push({
        phase: "0",
        inDate: data.admission.GuestInDate,
        outDate : data.admission.ProgramInDate
    });
    if(phase !== "1"){
      phaseData.push({
        phase: "1",
        inDate: data.admission.ProgramInDate,
        outDate : stage2AndAboveDate
    });
    }
    phaseData.push({
      phase,
      inDate: phase === "1" ? data.admission.ProgramInDate : stage2AndAboveDate
    });
  }else{
    phaseData.push({
      phase: "0",
      inDate: data.admission.GuestInDate,
  });
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
