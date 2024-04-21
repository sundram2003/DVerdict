import { useState } from "react";
// import "./Display.css";
const Display = (props) => {
  console.log("Inside the display componenttttt");

  const [data, setData] = useState("");
  const { court, account } = props?.props;
  const [flag, setFlag] = useState(true);
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
          {"https:" + item.substring(6)};
          <img
            src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
            // alt={`item.substring(6)`}
            alt={""}
            className="image-list"
          />
        </a>
      ));
      setData(images);
      setFlag(false);
    } catch (e) {
      alert("You don't have access");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="bg-gray-900">
        {!flag && (
          <div className="image-list bg-white-200 p-4 rounded-lg">
            <ul className="list-disc  pl-4 text-black">
              {data?.map((item, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-4 rounded-md shadow-md mb-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {flag && ( // Conditionally render the button based on flag value
          <button
            onClick={getdata}
            className="center block mx-auto mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Evidence
          </button>
        )}
      </div>
    </div>
  );
};
export default Display;
