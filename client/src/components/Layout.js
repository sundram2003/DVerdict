import React, { useState, useEffect } from "react";
import "../App.css";
import { Image, Table, Button, Input, Form } from "semantic-ui-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import TableList from "./TableList";
import Instance from "../middleware/web3";
import ShowModal from "../Pages/modal";
const Layout = ({ props }) => {
  const [user, setUser] = useState(4);
  const [hashesList, setHashesList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState("");
  const [accountId, setAccountId] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldReq, setFieldReq] = useState(false);
  const [readFileIframe, setReadFileIframe] = useState("");
  const [fileType, setFileType] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileBase64, setFileBase64] = useState("");
  const [encryptedFileString, setEncryptedFileString] = useState("");
  const [tempPublicKey, setTempPublicKey] = useState("");
  const [tempPrivateKey, setTempPrivateKey] = useState("");

  useEffect(() => {
    console.log("initializing layout");
    const fetchData = async () => {
      try {
        let acc = await Instance.web3.eth.getAccounts();
        setAccountId(acc[0]);
        console.log("acc in layout", acc);
        if (props.location) {
          setUser(props.location.state.user);
        }
        observe();
        axios.defaults.headers.common["api_key"] =
          process.env.REACT_APP_API_KEY;
        axios.defaults.headers.common["api_secret"] =
          process.env.REACT_APP_API_SECRET;
        if (acc[0] === process.env.ADMIN) {
          console.log("process.env.ADMIN", process.env.REACT_APP_ADMIN);
          //   getALLHashes();
        } else {
          console.log("not admin");
          //   getALLHashes();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [props.location]);

  const observe = async () => {
    try {
      setTimeout(observe, 1000);
      const accounts = await Instance.web3.eth.getAccounts();
      console.log("in observe", accounts);
      if (accounts[0] === accountId) {
      } else {
        window.location = "/";
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getALLHashes = async () => {
    try {
      let response = await axios.post(
        process.env.CUSTOM_URL + "/moibit/v0/listfiles",
        { path: "/" }
      );
      let data = [];
      let hashesList = [];
      let caseId = props.location.state.caseId;
      const { court } = props.passableItems;
      await court.methods.getEvidenceCount(caseId).call(async (err, count) => {
        for (let j = 0; j < count; j++) {
          await court.methods.getEvidence(caseId, j).call((err, ev) => {
            hashesList.push(ev.FileHash);
            setHashesList(hashesList);
          });
        }
        if (response.data.data.Entries !== null) {
          for (let i = 0; i < response.data.data.Entries.length; i++) {
            if (response.data.data.Entries[i].Type === 0) {
              if (hashesList.includes(response.data.data.Entries[i].Hash)) {
                data.push({
                  Name: response.data.data.Entries[i].Name,
                  Hash: response.data.data.Entries[i].Hash,
                  verfiledBoolean: 0,
                });
                setFileList(data);
              }
            }
          }
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (encryptedFileString !== "") {
      let formData = new FormData();
      let string = JSON.stringify(encryptedFileString);
      let blob = new Blob([string], { type: "text/plain" });
      let file = new File([blob], "document.txt", { type: "text/plain" });
      formData.append("file", file);
      formData.append("fileType", `/${fileType}`);
      formData.append("fileName", `/${file.name}`);
      setLoading(true);

      try {
        let response = await axios.post(
          process.env.CUSTOM_URL + "/moibit/v0/writefile",
          formData
        );
        const actualFileName = `${process.env.API_KEY}${response.data.data.Path}${response.data.data.Name}`;
        await Instance.Config.methods
          .setHash(actualFileName, response.data.data.Hash)
          .send({ from: accountId });
        await uploadEvidence(
          props.location.state.caseId,
          response.data.data.Hash,
          "text"
        );
        if (accountId === process.env.ADMIN) {
          getALLHashes();
          setLoading(false);
        } else {
          getALLHashes();
          setLoading(false);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    } else {
      setFieldReq(true);
    }
  };

  const uploadEvidence = async (caseId, filehash, filetype) => {
    const { account, court, GAS, GAS_PRICE } = props.passableItems;
    await court.methods
      .uploadEvidence(caseId, filehash, filetype)
      .send({ from: account, gas: GAS, gasPrice: GAS_PRICE });
  };

  const readFile = async (filehash, fileName) => {
    // Logic to read file
  };

  const modalClose = () => {
    setModalOpen(false);
  };

  const runEncrypt = async (_publicKey, _message) => {
    // Logic to encrypt message
  };

  const runDecrypt = async (_privateKey, _encrypted) => {
    // Logic to decrypt message
  };

  const convertBase64toBlob = (content, contentType) => {
    // Logic to convert base64 to blob
  };

  const downloadBlob = (_blob, type) => {
    // Logic to download blob
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {modalOpen && (
        <ShowModal
          modalOpen={modalOpen}
          modalClose={modalClose}
          fileType={fileType}
          responseData={readFileIframe}
          fileName={fileName}
        />
      )}
      <div className="flex justify-between items-center text-white ml-32 mt-10">
        <h3 className="text-2xl font-bold">CourtLedger</h3>
      </div>
      <div className="table-body-scrollable">
        {user === 4 ? (
          <h1 className="text-white text-center pt-10">
            <u>Not Authorized to view</u>
          </h1>
        ) : user === 2 ? (
          <>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Table
                celled
                size="small"
                className="upload-table mt-20 mb-40 bg-gray-100 text-gray-800"
              >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan="2">
                      <Input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          // Handle file change
                        }}
                        required
                        name="file"
                      />
                    </Table.HeaderCell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell colSpan="2" textAlign="center">
                      <Button primary type="submit">
                        Submit
                      </Button>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
              </Table>
            </Form>
            <div className="content-container">
              <TableList fileList={fileList} readFile={readFile} />
            </div>
          </>
        ) : (
          <div className="content-container">
            <TableList fileList={fileList} readFile={readFile} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
