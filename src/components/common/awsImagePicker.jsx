import React, { useRef, useState } from "react";
import awsService from "../../services/awsService";
import { uploadtoAws } from "../../services/awsUploadService";

const AWSImagePicker = ({ name, label, error, showLabel, value, onChange, url, buttonText }) => {
  const [uploading, setUploading] = useState(false);

  const myRef = useRef(null);

  const handleClick = () => {
    myRef.current.click();
  };

  const onImageChange = async (event) => {
    if(value){
        let deleted = await deleteImage()
        if(!deleted) return onChange({error: "Couldent delete old image! Try again."})
    }
    setUploading(true);
    try {
      const signedUrlObj = await awsService.getSignedUrl("ImgKey_"+event.target.files[0].name,"image/jpeg");
      const file = event.target.files[0];
      uploadtoAws(signedUrlObj.signedUrl, file)
        .then(() => {
            setUploading(false);
            console.log({url: signedUrlObj.downloadUrl, value: signedUrlObj.key });
            onChange({url: signedUrlObj.downloadUrl, value: signedUrlObj.key })
        });
    } catch (err) {
      setUploading(false);
      return onChange({error: "Couldent upload image! Try again."})
    }
  };

  const deleteImage = async () => {
    try {
        if(!value) await awsService.deleteObject(value);
        return true
    } catch (err) {
        return false
    }
}

  return (
    <div className="form-group">
      {showLabel && (
        <label htmlFor={name} className={"inputLabel"}>
          {label}
        </label>
      )}
      <div className="ImagePicker-Box">
        <button className="b" onClick={handleClick} disabled={uploading}>
          {buttonText ? buttonText : "+ Choose Image"}
        </button>
        <input
          ref={myRef}
          accept="image/jpeg"
          type="file"
          onChange={onImageChange}
          style={{ display: "none" }}
        />
        {url ? (
          <img src={url} className="image" width={"80px"} height={"80px"} style={{objectFit : "cover", borderRadius : 10}} alt="Resident"/>
        ) : (
          <div className="user-profile-box">
            <i className="fa fa-user fa-2x light-text" aria-hidden="true"></i>
          </div>
        )}
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default AWSImagePicker;

// type={item.typeName}
//         onChange={(json) => props.onChange(json, item.name)}
//         name={item.name}
//         label={item.label}
//         value={item.value ? item.value : ""}
//         showLabel={true}
//         error={item.error}
