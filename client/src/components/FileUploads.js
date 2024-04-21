import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "./Loader";
// import "./FileUpload.css";
const FileUploads = (props) => {
  const [loading, setLoading] = useState(false);
  console.log("props in fileuploads", props);
  const { court, account } = props?.props;
  const [file, setFile] = useState(null);
  console.log("court inside file upload", court);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        console.log("Before uploading to pinata");
        const resFile = await axios({
          method: "POST",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "a20c25067665d125e695",
            pinata_secret_api_key:
              "c24d9706e87acbde4c4584c15f918db2182c6198773c90f442998281f7e89b42",
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("after uploading to pinata");
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        const caseId = localStorage.getItem("caseId");
        console.log("CaseId in fileuploads: ", caseId);
        await court.methods
          .uploadEvidence(caseId, ImgHash, "file")
          .send({ from: account });

        // alert("Successfully Image Uploaded");
        toast.success("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        console.log("errorrrrrrrrrr", e);
        toast.error("Unable to upload image to Pinata");
        // alert("Unable to upload image to Pinata");
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    }
    // alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="bg-gray-900">
      <div className="p-8 max-w-md mx-auto bg-gray-800 rounded-xl shadow-md shadow-slate-300 space-y-4 mt-4">
        {/* <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          //   disabled={!props.account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form> */}
        <div className="bg-white p-6 rounded shadow-md">
          <form className="form" onSubmit={handleSubmit}>
            <label
              htmlFor="file-upload"
              className="block text-center bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer mb-4"
            >
              Choose Image
            </label>
            <input
              type="file"
              id="file-upload"
              name="data"
              className="hidden"
              onChange={retrieveFile}
            />
            <span className="block text-center mb-2">Image: {fileName}</span>
            <button
              type="submit"
              className="block mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer disabled:opacity-50"
              disabled={!file}
            >
              {loading && <Loader />}
              {!loading ? "" : "Uploading..."}
              Upload File
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FileUploads;
