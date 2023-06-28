/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  getResidentByID,
  getAdmission,
  updateResident,
  getResidentFragment,
  updateResidentPhase,
  getResidentAdmissionRecords,
} from "../../services/residentService";

import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import Form from "../common/simpleForm";
import { getResidentUpdateObject } from "../../utils/residentUpdateObject";
import { getResidentNotes } from "../../services/residentFragments/frag_notes";
import NotesList from "../../components/common/residentView_Common_Components/notesList";
import CreateNote from "../../components/common/residentView_Common_Components/createNote";
import FragmentList from "../../components/common/residentView_Common_Components/fragmentsList";
import CreateFragment from "../../components/common/residentView_Common_Components/createFragment";
import PhaseList from "../../components/common/residentView_Common_Components/phaseList";
import PhaseChange from "../../components/common/residentView_Common_Components/phaseChange";
import UpdateFragment from "../../components/common/residentView_Common_Components/updateFragment";
import { getList } from "../../services/listService";
import { getCurrentUser } from "../../services/authService";
import { level3Access } from "../../utils/roles";
import { toast } from "react-toastify";
import AdmissionRecords from "../../components/common/residentView_Common_Components/AdmissionRecords";
import { getAdmissionRecordobject } from "../../utils/admissionRecordObject";

const AdmissionRecord = (props) => {
  const AdmissionID = window.location.pathname.split("/")[3];
  const [admission, setAdmission] = useState();
  const [phaseInfo, setPhaseInfo] = useState();
  const [PhaseState, setPhaseState] = useState("View");

  useEffect(() => {
    const getandSetResident = async () => {
      try {
        let { data: queriedAdmission } = await getAdmission(AdmissionID);
        if (queriedAdmission) {
          let object = await getAdmissionRecordobject();
          object.forEach((row, i) => {
            row.forEach((item, index) => {
              let key = item.name.split("_")[3];
              if (queriedAdmission[key]) {
                object[i][index].value = queriedAdmission[key];
              }
            });
          });

          setAdmission(object);
        }
      } catch (error) {
        //
      }
    };
    getandSetResident();
  }, []);

  //   useEffect(() => {
  //     if (admission) {
  //       let phaseData = admission.PhaseData;
  //       if(!phaseData){
  //         phaseData = [
  //           {
  //             phase : admission.RecentPhase,
  //             inDate : admission.ProgramInDate ? admission.ProgramInDate : admission.GuestInDate
  //           }
  //         ]
  //       }else{
  //         phaseData = JSON.parse(phaseData);
  //       }
  //       console.log(phaseData)
  //       setPhaseInfo(phaseData);
  //     }
  //   }, [admission]);

  return (
    <div className="residentView-Container">
      <div className="residentView-Header">
        <h2 className="primary">Resident Admission Record</h2>
      </div>
      <div className="residentView-Sections">
        {admission && (
          <Form buttonLabel={""} data={admission} readOnly={true} onChange={() => {}} />
        )}
      </div>
    </div>
  );
};

export default AdmissionRecord;
