import React from "react";
import Date1 from "../date";
import { level2Access } from "../../../utils/roles";
import { getCurrentUser } from "../../../services/authService";

const PhaseList = (props) => {
  const user = getCurrentUser()
  const data = props.data
  

  return (
    <div className="fragmentList-Container">
      {data.length >0  ?
          <div className="fragmentList-List">
            {data.map((phase, i) =>(
                <div className="fragmentList-Item" key={i.toString()}>
                    <div className="fragmentList-Item-Title flex-start grow05">
                        {`Phase ${phase.phase}`}
                    </div>
                    <div className="fragmentList-Item-Title center">
                        {phase.inDate ? dateFormatter(phase.inDate) : "-"}
                    </div>
                    {((data.length >1? true : i !== 0) && i !== (data.length - 1)) && level2Access(user)  ?
                      <Date1
                      onChange={(json) => {
                        props.modifyPhase(json, i)
                      }}
                      value={phase.outDate}
                    /> :
                    <div className="fragmentList-Item-Title center">
                        {phase.outDate ? dateFormatter(phase.outDate) : "Current"}
                    </div>
                    }
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
    d = new Date(d)
    return (d.getMonth() + 1) + "/" +  d.getDate() + "/" +  d.getFullYear();
}

export default PhaseList;
