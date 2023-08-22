import React from "react";
import { getCurrentUser } from "../../../services/authService";

const FragmentList = ({data,title, onManage, list :educationList}) => {
  let getName = (id) =>{
    let name = ""
    educationList.forEach((list) =>{
      if(list.value == id) name = list.name 
    })
    return name ? name : id
  }

  let user = getCurrentUser()

  return (
    <div className="fragmentList-Container">
      {data.length >0  ?
          <div className="fragmentList-List">
            {data.map((entry) =>(
                <div className="fragmentList-Item" key={entry.ID}>
                    <div className="fragmentList-Item-Title">
                        {(educationList? getName(entry[title]) : (entry[title]? entry[title] : "-"))}
                    </div>
                    <button className="b" onClick={() => onManage(entry)}>{user.isCaseCoordinator? "Manage" : "View"}</button>
                </div>
            ))
            }
          </div>
       :
      <div className="fragmentList-NoData">
            No Entries
      </div>}
    </div>
  );
};

// function dateFormatter(d){
//     d = new Date(d)
//     return d.getDate() + "/" +  (d.getMonth() + 1) + "/" +  d.getFullYear();
// }

export default FragmentList;
