import React from "react";

const PhaseList = (props) => {
  const data = props.data

  return (
    <div className="fragmentList-Container">
      {data.length >0  ?
          <div className="fragmentList-List">
            {data.map((phase, i) =>(
                <div className="fragmentList-Item" key={i.toString()}>
                    <div className="fragmentList-Item-Title flex-start">
                        {`Phase ${phase.phase}`}
                    </div>
                    <div className="fragmentList-Item-Title center">
                        {phase.inDate ? dateFormatter(phase.inDate) : "-"}
                    </div>
                    <div className="fragmentList-Item-Title flex-end">
                        {phase.outDate ? dateFormatter(phase.outDate) : "Current"}
                    </div>
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
