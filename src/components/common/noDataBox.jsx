import React from "react";

const NoDataBox = ({message}) => {
  return (
    <div className="noDataBox">
        <div className="noDataBox-Text">
            {message}
        </div>
    </div>
  );
};

export default NoDataBox;
