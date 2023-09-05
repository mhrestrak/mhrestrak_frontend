import React from "react";
import { Link } from "react-router-dom";

const AdmissionRecords = (props) => {
  const data = props.data

  return (
    <div className="fragmentList-Container">
      {data.length >0  ?
          <div className="fragmentList-List">
            {data.map((admission, i) =>(
                <div className="fragmentList-Item" key={i.toString()}>
                    <div className="fragmentList-Item-Title flex-start grow05">
                        {`Admission ${i+1}`}
                    </div>
                    <div className="fragmentList-Item-Title center">
                        {admission.ProgramInDate ? dateFormatter(admission.ProgramInDate) : admission.GuestInDate ? dateFormatter(admission.GuestInDate) : "-"} - {admission.DateOut ? dateFormatter(admission.DateOut) : "-"}
                    </div>
                    <Link to={`/dashboard/admission-record/${admission.AdmissionID}`} className="nav-item">
                        <button className="b">View</button>
                    </Link>
                </div>
            ))
            }
          </div>
       : 
      <div className="fragmentList-NoData">
            No Previous Phases in this Admission
      </div>}
    </div>
  );
};

function dateFormatter(d){
  if(typeof d === "string"){
    d = d.split('T')[0]
  }
    d = new Date(d)
    return (d.getMonth() + 1) + "/" +  d.getDate() + "/" +  d.getFullYear();
}

export default AdmissionRecords;
