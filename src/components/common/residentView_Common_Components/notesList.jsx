import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getList } from "../../../services/listService";


const NotesList = (props) => {
  const notes = props.data;
  notes.sort((a,b) =>  new Date(b.NoteDateTime) - new Date(a.NoteDateTime));
  
  const [NoteCategories, setNoteCategories] = useState();

  useEffect(() =>{
    const asyncFunc = async () => {
        const noteList = await getList(4);
        console.log(noteList)
        notes.forEach((note, i)=>{
            noteList.forEach((list) =>{
                if(list.value === note.NoteCategoryListID){
                    notes[i].category = list.name
                }
            })
        })
        setNoteCategories(noteList)
    }
    asyncFunc()
  },[])


  return (
    <div className="notesList-Container">
      {notes.length >0  ?
          <div className="notesList-List">
            {notes.map((notes) =>(
                <div className="noteList-Item" key={notes.ID}>
                    <div className="noteList-Item-Title">
                        {notes.NoteSubject ? notes.NoteSubject : "Note"}
                    </div>
                    <div className="noteList-Item-Date">
                        <div>{NoteCategories && ` ${notes.category}`}</div>
                        <div >
                          <div>
                            {dateFormatter(notes.NoteDateTime)}
                          </div>
                          {notes.NoteByName &&
                            <div className="noteList-Item-Date-container">
                              {notes.NoteByName}
                            </div>
                          }
                        </div>
                    </div>
                    <div className="noteList-Item-Body">
                            {notes.Note}
                    </div>
                </div>
            ))
            }
          </div>
       : 
      <div className="notesList-NoData">
            No Notes
      </div>}
    </div>
  );
};

function dateFormatter(d){
  if(typeof d === "string"){
    d= d.split('T')[0]
  }
    d = new Date(d)
    return  (d.getMonth() + 1) + "/" +  d.getDate() + "/" +  d.getFullYear();
}

export default NotesList;
