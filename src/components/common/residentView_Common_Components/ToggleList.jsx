import React from "react";

const ToggleList = (props) => {
  return (
    <div className="toggle-Container">
      {props.data?.length > 0 ? (
        <div className="toggle-List">
          {props.data.map((entry) => (
            <div
              className="fragmentList-Item paddingVertical backgroundWhite"
              key={entry.ResID}
            >
              <div className="fragmentList-Item-Title">
                {entry.ResFirstName + " " + entry.ResLastName}
              </div>
              <div className="toggle-buttonContainer">
                <i
                  className="fa fa-trash-o danger-text"
                  aria-hidden="true"
                  onClick={() => props.onRemove(entry)}
                />
                <i
                  className="fa fa-exchange"
                  aria-hidden="true"
                  onClick={() => props.onToggle(entry)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="fragmentList-NoData">None</div>
      )}
    </div>
  );
};

export default ToggleList;
