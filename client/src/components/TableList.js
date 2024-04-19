import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";

const TableList = ({ fileList, readFile }) => {
  const [props1, setProps1] = useState({ fileList });

  useEffect(() => {
    setProps1({ fileList });
  }, [fileList]);

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            File Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            colSpan="2"
          >
            File Hash
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Verified (Auto verification happens when you view file)
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {props1.fileList.length === 0 ? (
          <tr>
            <td className="px-6 py-4 whitespace-nowrap" colSpan="4">
              No Data
            </td>
          </tr>
        ) : (
          props1.fileList.map((aFile) => (
            <tr key={aFile.fileName}>
              <td
                className="px-6 py-4 whitespace-nowrap text-blue-500 cursor-pointer hashHover"
                onClick={() => props1.readFile(aFile.Hash, aFile.Name)}
              >
                {aFile.Name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap" colSpan="2">
                <p>{aFile.Hash}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {aFile.verfiledBoolean === 0 ? (
                  <h5 className="text-blue-500">Unverified</h5>
                ) : aFile.verfiledBoolean === 1 ? (
                  <h5 className="text-green-500">Passed</h5>
                ) : aFile.verfiledBoolean === -1 ? (
                  <h5 className="text-red-500">Failed</h5>
                ) : (
                  <Icon loading name="spinner" size="large" />
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TableList;
