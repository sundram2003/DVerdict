import React, { useEffect, useState } from "react";
// import Web3 from "web3";
import { useParams } from "react-router-dom";

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
function Room(props) {
  //   const [account, setAccount] = useState();
  //   const [loading, setLoading] = useState(true);
  //   useEffect(() => {
  //     const getAccount = async () => {
  //       const web3 = window.web3;
  //       const accounts = await web3?.eth?.getAccounts();
  //       setAccount(accounts[0]);
  //       //   setTimeout(() => setLoading(false), 1000);
  //     };
  //     getAccount();
  //   }, []);
  //   console.log("account inside room", account);
  let { roomId } = useParams();
  if (!roomId) {
    roomId = localStorage.getItem("caseId");
  }

  console.log("Inside room : ", roomId);
  // const userName = "";
  function randomID(len) {
    let result = "";
    if (result) return result;
    var chars =
        "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }
  const myMeeting = async (element) => {
    const appId = 1746752404;
    const serverSecret = "fffa2cae61be81795643327c123420b6";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomId,
      randomID(5),
      randomID(32)
    );
    console.log("Kit Token", kitToken);
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    console.log("ZC: ", zc);
    zc.joinRoom({
      container: element,
      //   sharedLinks: [
      //     {
      //       name: "Copy Link",
      //       url: https://localhost:3000/room/${roomId},
      //     },
      //   ],
      scenario: {
        //definde everything that you want
        mode: ZegoUIKitPrebuilt.GroupCall,
      },

      // showScreenSharingButton: false,//similary you can define other properties
    });
  };
  //   if (loading) return null;
  return (
    <div className="bg-gray-900">
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <div className="w-full max-w-4xl h-full  border border-gray-900  rounded-lg overflow-hidden">
          {/* Content of the video calling component */}
          <div
            ref={myMeeting}
            className="border border-gray-300 rounded-lg shadow-md p-4"
          >
            {/* Content of the group calling component */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;
