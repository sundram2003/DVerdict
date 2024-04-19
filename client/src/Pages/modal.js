import React from "react";
import { Image, Modal } from "semantic-ui-react";
import FileSaver from "file-saver";

const ShowModal = (props) => {
  return (
    <Modal open={props.modalOpen} size="small">
      <Modal.Header>
        <div className="flex justify-between">
          <p>{props.fileName}</p>
          <p className="cursor-pointer" onClick={props.modalClose}>
            &#10005;
          </p>
        </div>
      </Modal.Header>
      <Modal.Content image>
        {props.fileType === "image/png" ||
        props.fileType === "image/jpeg" ||
        props.fileType === "image/gif" ? (
          <Image
            wrapped
            size="medium"
            src={props.responseData}
            className="m-auto"
          />
        ) : props.fileType === "text/plain" ||
          props.fileType === "text/html" ||
          props.fileType === "text/js" ||
          props.fileType === "text/csv" ? (
          <p>{props.responseData}</p>
        ) : (
          <div>
            <h3 className="float-left">
              No preview available.
              <span
                className="text-blue-500 ml-3 cursor-pointer"
                onClick={() =>
                  FileSaver.saveAs(props.responseData, props.fileName)
                }
              >
                Download
              </span>
            </h3>
          </div>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default ShowModal;
