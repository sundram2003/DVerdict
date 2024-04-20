import { useState } from "react";
import "./Display.css";
const Display = (props) => {
  console.log("Inside the display componenttttt");

  const [data, setData] = useState("");
  const { court, account } = props?.props;
  const getdata = async () => {
    try {
      let dataArray = [];
      let caseId = localStorage.getItem("caseId");
      console.log("getting caseId", caseId);
      let evidenceNo = await court.methods.getEvidenceCount(caseId).call();
      console.log("evidenceNo", evidenceNo);
      for (let i = 0; i < evidenceNo; i++) {
        let evidence = await court.methods.getEvidence(caseId, i).call();
        console.log("evidence", evidence);
        dataArray.push(evidence.FileHash);
      }
      console.log(dataArray);

      const images = dataArray?.map((item, index) => (
        <a href={item} key={index} target="_blank">
          <img
            src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
            alt="new"
            className="image-list"
          />
        </a>
      ));
      setData(images);
    } catch (e) {
      alert("You don't have access");
    }
  };

  return (
    <>
      <div className="image-list">{data}</div>
      {/* <input
        type="text"
        placeholder="Type something to getAdress"
        className="address"
      ></input> */}
      <button className="center button" onClick={getdata}>
        Get Evidence
      </button>
    </>
  );
};
export default Display;
