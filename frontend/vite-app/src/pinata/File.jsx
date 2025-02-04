import { useState } from "react";
import { pinata } from "../utils/config"

function IPFSFileUpload() {
  const [selectedFile, setSelectedFile]= useState();
  const [url, setUrl] = useState("");

  const changeHandler = (event) => {
    setSelectedFile(event.target?.files?.[0]);
  };

  const handleSubmission = async () => {
    try {
      const upload = await pinata.upload.file(selectedFile)
      console.log(upload);

      const ipfsUrl = await pinata.gateways.convert(upload.IpfsHash)
      console.log(ipfsUrl);
      
      setUrl(ipfsUrl)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <label className="form-label"> Choose File</label>
      <input
        type="file"
        onChange={changeHandler}
      />
      <button onClick={handleSubmission}>Submit</button>
      {url && (
        <img
          src={url}
          alt="uploaded image"
        />
      )}
    </>
  );
}

export default IPFSFileUpload;
