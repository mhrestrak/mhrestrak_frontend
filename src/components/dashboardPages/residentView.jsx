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

const UpdateResident = (props) => {
  const ResID = window.location.pathname.split("/")[3];
  const user = getCurrentUser()
  const [resident, setResident] = useState();
  const [admission, setAdmission] = useState();
  const [profileUpdateData, setProfileUpdateData] = useState(
    getResidentUpdateObject()
  );
  const [ProfileUpdatemessage, setProfileUpdatemessage] = useState("");
  const [Notes, setNotes] = useState();
  const [NotesState, setNotesState] = useState("View");
  const [Fragments, setFragments] = useState([]);
  const [FragmentToBeUpdated, setFragmentToBeUpdated] = useState({})
  const [phaseInfo, setPhaseInfo] = useState();
  const [PhaseState, setPhaseState] = useState("View");
  const [AdmissionHistory, setAdmissionHistory] = useState();


  useEffect(() => {
    const getandSetResident = async () => {
      try {
        //get Resident
        let { data: queriedResident } = await getResidentByID(ResID);
        if (queriedResident) {
          console.log(queriedResident)
          setResident(queriedResident);

          //get Admission
          if (queriedResident.IsActive) {
            let { data: queriedAdmission } = await getAdmission(ResID);
            console.log(queriedAdmission)
            if (queriedAdmission) setAdmission(queriedAdmission);
          }
          //get Notes
          const notes = await getResidentNotes(ResID);
          if (notes.data?.length > 0) setNotes(notes.data);
          //   if(notes.data?.length >0) setNotes([])
          else setNotes([]);

          //get Admissions
          const admissions = await getResidentAdmissionRecords(ResID);
          console.log("Admissions", admissions.data)
          if(admissions.data?.length > 1) {
            admissions.data = admissions.data.filter((adms) => adms.DateOut ? true : false)
            if(admissions.data?.length > 0) setAdmissionHistory(admissions.data)
          }

          getFragments();
        } else {
          //
        }
      } catch (error) {
        //
      }
    };
    getandSetResident();
  }, []);

  useEffect(() => {
    //setProfile
    if (resident) {
      const tempProfieData = [...profileUpdateData];
      profileUpdateData.forEach((row, i) => {
        row.forEach((item, i2) => {
          let key = item.name.split("_")[3];
          if (resident[key]) tempProfieData[i][i2].value = resident[key];
        });
      });
      setProfileUpdateData(tempProfieData);
    }
  }, [resident]);

  useEffect(() => {
    if (admission) {
      let phaseData = admission.PhaseData;
      if(!phaseData){
        phaseData = [
          {
            phase : admission.RecentPhase,
            inDate : admission.ProgramInDate ? admission.ProgramInDate : admission.GuestInDate
          }
        ]
      }else{
        phaseData = JSON.parse(phaseData);
      }
      console.log(phaseData)
      setPhaseInfo(phaseData);
    }
  }, [admission]);

  const getFragments = async () => {
    let educationList = await getList(2);
    let conatctTypeList = await getList(11);
    console.log(conatctTypeList)
    const fragmentsArray = [
      {
        title: "Contacts",
        name: "contacts",
        items: [],
        state: "View",
        titleName: "ContactFirstName",
        list : conatctTypeList
      },
      {
        title: "Medication",
        name: "medication",
        items: [],
        state: "View",
        titleName: "MedicationName",
      },
      {
        title: "Drug",
        name: "drug",
        items: [],
        state: "View",
        titleName: "DrugOfChoice",
      },
      {
        title: "Education",
        name: "education",
        items: [],
        state: "View",
        titleName: "EducationLevel",
        list : educationList
      },
      {
        title: "Employment",
        name: "employment",
        items: [],
        state: "View",
        titleName: "JobTitle",
      },
      {
        title: "Medical",
        name: "medical",
        items: [],
        state: "View",
        titleName: "Condition",
      },
      {
        title: "Legal",
        name: "legal",
        items: [],
        state: "View",
        titleName: "CaseNumber",
      },
      //   { title: "Family", name: "family", items: [], state : "View", titleName : "" },
      //   { title: "Contacts", name: "contacts", items: [], state : "View", titleName : "" },
      //   { title: "Finance", name: "finance", items: [], state : "View", titleName : "" },
    ];

    for (let i = 0; i < fragmentsArray.length; i++) {
      const fragment = fragmentsArray[i];
      let result = await getResidentFragment(fragment.name, ResID);
      if (result.data?.length > 0) fragmentsArray[i].items = result.data;
      if (i === fragmentsArray.length - 1) {
        setFragments(fragmentsArray);
      }
    }
  };

  // Profile updation
  const handleProfileFieldUpdation = (name, item) => {
    setProfileUpdatemessage(undefined);
    let tempProfileData = [...profileUpdateData];
    tempProfileData[parseInt(name[1], 10)][parseInt(name[2], 10)] = item;
    return setProfileUpdateData(tempProfileData);
  };

  const handleProfileUpdateSubmit = async ({ validation, errorData }) => {
    if (validation) {
      const tempResident = { ResID: resident.ResID };
      profileUpdateData.forEach((row) => {
        row.forEach((item) => {
          let key = item.name.split("_")[3];
          tempResident[key] = item.value;
        });
      });
      try {
        let { data } = await updateResident(tempResident);
        if (data) {
          setResident(data);
          setProfileUpdatemessage("Updated!");
        } else {
          setProfileUpdatemessage("Failed to Update Resident");
        }
      } catch (error) {
        //@ts-ignore
        setProfileUpdatemessage("Failed to Update Resident");
      }
    } else {
      return setProfileUpdateData(errorData);
    }
  };

  const noteCreated = async () => {
    //get Notes
    const notes = await getResidentNotes(ResID);
    if (notes.data?.length > 0) setNotes(notes.data);
    //   if(notes.data?.length >0) setNotes([])
    else setNotes([]);
    setNotesState("View");
  };

  const setFragmentState = (name, state) => {
    let tempFrags = [...Fragments];
    tempFrags.forEach((frag, i) => {
      if (frag.name === name) {
        tempFrags[i].state = state;
      }
    });
    setFragments(tempFrags);
  };

  const fragmentCreated = async (name) => {
    let fragmentsArray = [...Fragments];
    for (let i = 0; i < fragmentsArray.length; i++) {
      const fragment = fragmentsArray[i];
      if (name === fragment.name) {
        let result = await getResidentFragment(fragment.name, ResID);
        fragmentsArray[i].items = result.data;
        setFragments(fragmentsArray);
      }
    }
    setFragmentState(name, "View");
  };

  const setFragmentToUpdated = (name, data) =>{
    let fTBU = {...FragmentToBeUpdated}
    fTBU[name] = data
    console.log(fTBU,"pp")
    setFragmentToBeUpdated(fTBU)
    setFragmentState(name, "Manage")
  }

  const phaseChanged = async () => {
    let { data: queriedResident } = await getResidentByID(ResID);
    if (queriedResident) {
      setResident(queriedResident);

      //get Admission
      if (queriedResident.IsActive) {
        let { data: queriedAdmission } = await getAdmission(ResID);
        if (queriedAdmission) setAdmission(queriedAdmission);
      }
      setPhaseState("View");
    }
  };

  const updatePhase = async (date, index) =>{
    console.log(1)
    let tempPhaseInfo = [...phaseInfo]
    tempPhaseInfo[index].outDate = date
    if(tempPhaseInfo[index+1]){
      tempPhaseInfo[index+1].inDate = date
    }
    const data1 = {
      ResID : ResID,
      phaseData : tempPhaseInfo
    };
    
    try {
      console.log(2)
      let {data} = await updateResidentPhase(data1);
      console.log(3)
      phaseChanged()
      toast.success("Phase transition date updated!")

    }catch(err){
      console.log(err)
    }
  }

  function dateFormatter(d) {
    d = new Date(d);
    return (d.getMonth() + 1) + "/" +  d.getDate()+ "/" + d.getFullYear();
  }

  return (
    <div className="residentView-Container">
      <div className="residentView-Header">
        <h2 className="primary">Resident View</h2>
        {admission && <h4>{`Phase ${resident?.RecentPhase}`}</h4>}
        {admission ? (
          <div className="residentView-activeBadge">Active</div>
        ) : (
          resident &&
          !resident.IsActive && level3Access(user) && (
            <div>
              {/* <Link
                to={`/dashboard/exit-guest/${resident.ResID}`}
                className="nav-item paddingRight01"
              >
                <button className="b blackButton">Exit Guest</button>
              </Link> */}
              <Link
                to={`/dashboard/create-admission/${resident.ResID}`}
                className="nav-item"
              >
                <button className="b ">Create Admission</button>
              </Link>
            </div>
          )
        )}
      </div>
      <div className="residentView-Sections">
        {resident && (
          <div className="residentView-sectionBox">
            <div>
                <div className="ImagePicker-Box">
                {resident.ResPictureKey ?
            <img src={resident.ResPictureKey} className="image" width={"200px"} />
         : 
        <div className="user-profile-box-res">
          <i className="fa fa-user fa-2x light-text" aria-hidden="true"></i>
        </div>
        }
                </div>
              <Form
                data={profileUpdateData}
                onChange={handleProfileFieldUpdation}
                submit={handleProfileUpdateSubmit}
                buttonLabel={"Update"}
                readOnly={!level3Access(user)}
              ></Form>
              {ProfileUpdatemessage && (
                <div className="updateResident-footer">
                  {ProfileUpdatemessage}
                </div>
              )}
            </div>
          </div>
        )}
        {Notes && (
          <div className="residentView-sectionBox">
            <div className="residentView-sectionBox-header">
              <h4 className="primary">Notes</h4>
              {NotesState === "View" ? (
                <button className="b" onClick={() => setNotesState("Create")}>
                  Add Note
                </button>
              ) : (
                <button
                  className="b blackButton"
                  onClick={() => setNotesState("View")}
                >
                  Cancel
                </button>
              )}
            </div>
            {NotesState === "View" ? (
              <NotesList data={Notes} />
            ) : (
              <CreateNote onCreate={noteCreated} ResId={ResID} />
            )}
          </div>
        )}
        {phaseInfo && (
          <div className="residentView-sectionBox">
            <div className="residentView-sectionBox-header">
              <h4 className="primary">Phase Management</h4>
              {PhaseState === "Change" && (
                <button
                  className="b blackButton"
                  onClick={() => setPhaseState("View")}
                >
                  Cancel
                </button>
              )}
            </div>
            {PhaseState === "View" ? (
              <div className="PhaseManagement-Container">
                <div className="PhaseManagement-currentPhase">
                  <h5>Current Phase</h5>
                  <p>{`Phase ${phaseInfo[phaseInfo.length - 1].phase}`}</p>
                </div>
                <div className="PhaseManagement-currentPhase">
                  <h5>Phase In-Date</h5>
                  <p>{`${dateFormatter(
                    phaseInfo[phaseInfo.length - 1].inDate
                  )}`}</p>
                </div>
                {level3Access(user) &&
                <div className="PhaseManagement-buttons">
                  <Link to={`/dashboard/exit/${ResID}`} className="nav-item">
                    <button
                      className="b blackButton"
                      onClick={() => console.log("Df")}
                    >
                      Exit Resident
                    </button>
                  </Link>
                  <button className="b" onClick={() => setPhaseState("Change")}>
                    Change Phase
                  </button>
                </div>

                }
              </div>
            ) : (
              <PhaseChange
                onChange={phaseChanged}
                ResId={ResID}
                phaseData={phaseInfo}
              />
            )}
          </div>
        )}
        {phaseInfo && (
          <div className="residentView-sectionBox">
            <div className="residentView-sectionBox-header">
              <h4 className="primary">Current Admission - Phase History</h4>
            </div>
            <PhaseList data={phaseInfo} modifyPhase={updatePhase}/>
          </div>
        )}{
          AdmissionHistory && (
            <>
            <div className="residentView-sectionBox">
            <div className="residentView-sectionBox-header">
              <h4 className="primary">Admission History</h4>
            </div>
            <AdmissionRecords data={AdmissionHistory}/>
          </div>
          <div className="residentView-sectionBox-Placeholder"/>
        </>
          )
        }
      </div>
      {resident && (
        <>
          <div className="residentView-SubTitle">
            <h3 className="primary">Resident Fragments</h3>
          </div>
          <div className="residentView-Sections">
            {Fragments.length > 0 ? (
              Fragments.map((fragment) => (
                <div className="residentView-sectionBox">
                  <div className="residentView-sectionBox-header">
                    <h4 className="primary">{fragment.title}</h4>
                    {fragment.state === "View" ? level3Access(user) ?  (
                      <button
                        className="b secondayButton"
                        onClick={() =>
                          setFragmentState(fragment.name, "Create")
                        }
                      >
                        Add
                      </button>
                    ):<></> : (
                      <button
                        className="b blackButton"
                        onClick={() => setFragmentState(fragment.name, "View")}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                  {fragment.state === "View" ? (
                    <FragmentList
                      data={fragment.items}
                      title={fragment.titleName}
                      list={fragment.list}
                      onManage={(data) => setFragmentToUpdated(fragment.name, data)}
                    />
                  ) : fragment.state === "Manage" ? 
                  <UpdateFragment
                    onUpdate={fragmentCreated}
                    name={fragment.name}
                    data={FragmentToBeUpdated[fragment.name]}
                  />: (
                    <CreateFragment
                      onCreate={fragmentCreated}
                      ResId={ResID}
                      name={fragment.name}
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="residentView-sectionBox">Loading...</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateResident;
