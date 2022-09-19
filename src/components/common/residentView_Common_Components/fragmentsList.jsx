import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getList } from "../../../services/listService";


const FragmentList = (props) => {
  const data = props.data;
  const title = props.title
  console.log(title)

  return (
    <div className="fragmentList-Container">
      {data.length >0  ?
          <div className="fragmentList-List">
            {data.map((entry) =>(
                <div className="fragmentList-Item" key={entry.ID}>
                    <div className="fragmentList-Item-Title">
                        {entry[title] ? entry[title] : "Entry"}
                    </div>
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
