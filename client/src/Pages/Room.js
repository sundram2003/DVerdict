import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
function Room() {
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
      randomID(5)
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
  return (
    <div>
      <div ref={myMeeting} />
    </div>
  );
}

export default Room;
