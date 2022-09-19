import React from "react";
import DropboxChooser from "react-dropbox-chooser"

const AppKey = "pamhzojpeq49ubv"

const ImageChooser = ({ name, label, error, showLabel, value, onChange}) => {
console.log(value)
  const handleSuccess = (files) =>{
    console.log(files)
     onChange(files[0].thumbnailLink)
  }

  return (
    <div className="form-group">
      {showLabel && (
        <label htmlFor={name} className={"inputLabel"}>
          {label}
        </label>
      )}
      <div className="ImagePicker-Box">
      <DropboxChooser
        appKey={AppKey}
        success={handleSuccess}
        cancel={() => console.log('closed')}
        multiselect={true}>
        <button className="b"> +  Choose Image</button>
      </DropboxChooser>
        {value ? 
            <img src={value} className="image" width={"100px"} />
         : 
        <div className="user-profile-box">
          <i className="fa fa-user fa-2x light-text" aria-hidden="true"></i>
        </div>
        }
      </div>  

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default ImageChooser;


// type={item.typeName}
//         onChange={(json) => props.onChange(json, item.name)}
//         name={item.name}
//         label={item.label}
//         value={item.value ? item.value : ""}
//         showLabel={true}
//         error={item.error}