import { useState } from "react";
import { pinata } from "./utils/config"

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const changeHandler = (event) => {
    setSelectedFiles(event.target?.files);
  };

  const handleSubmission = async () => {
    try {
      const upload = await pinata.upload.fileArray(selectedFiles)
      console.log(upload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <label className="form-label"> Choose File</label>
      <input
        directory=""
        webkitdirectory=""
        type="file"
        onChange={changeHandler}
      />
      <button onClick={handleSubmission}>Submit</button>
    </>
  );
}

export default App;
