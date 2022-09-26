import React from "react";

const FragmentList = ({data,title, onManage}) => {

  return (
    <div className="fragmentList-Container">
      {data.length >0  ?
          <div className="fragmentList-List">
            {data.map((entry) =>(
                <div className="fragmentList-Item" key={entry.ID}>
                    <div className="fragmentList-Item-Title">
                        {entry[title] ? entry[title] : "Entry"}
                    </div>
                    <button className="b" onClick={() => onManage(entry)}>Manage</button>
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
