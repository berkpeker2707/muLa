import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import defaultProfilePicture from "../../../src/defaultProfilePicture.png";

const Matched = ({ currentUser, setCurrentConversation }) => {
  const [matched, setMatched] = useState([]);
  // const [currentMatched, setCurrentMatched] = useState([])

  // useEffect(() => {
  //   setMatchedId
  // }, [input])

  useEffect(() => {
    const getMatched = async () => {
      try {
        const res = await axios.get("/matched/" + currentUser.user._id);
        setMatched(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getMatched();
  }, [currentUser.user._id]);

  // useEffect(() => {
  //   setCurrentMatched(matched.filter((m) => matchedUsers.includes(m._id)));
  // }, [matched, currentMatched]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentUser.user._id}/${user._id}`
      );
      setCurrentConversation(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* {matched.map(matched => ( */}
      <div className="matchedUserOuter">
        <h6>Matched Users</h6>
        {matched.map((mapmatch) => (
          <div
            className="matchedUser"
            onClick={() => {
              handleClick(mapmatch);
            }}
          >
            {mapmatch.picture === undefined ? (
              <img
                src={defaultProfilePicture}
                className="conversationImage"
                draggable="false"
              />
            ) : (
              <img
                src={`/me/avatar/${mapmatch?.picture?.filename}`}
                className="conversationImage"
                draggable="false"
              />
            )}
            <span className="matchedUserName">{mapmatch.firstname}</span>
          </div>
        ))}
      </div>
      {/* ))} */}
    </>
  );
};

export default Matched;
