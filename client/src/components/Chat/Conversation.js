import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import defaultProfilePicture from "../../../src/defaultProfilePicture.png";
import "../../App.css";
import LoadingGif from "../Dashboard/LoadingGif";

const Conversation = ({ conversation, currentUser }) => {
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find(
      (member) => member !== currentUser.user._id
    );

    const getFriend = async () => {
      try {
        const res = await axios("/user/" + friendId);
        setFriend(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriend();
  }, [conversation, currentUser]);

  return (
    <>
      {friend === null ? (
        <p className="conversationLoading">Loading...</p>
      ) : (
        <Fragment>
          {friend !== null || undefined || {} ? (
            <div className="conversations">
              <div className="conversation">
                {friend.picture === undefined ? (
                  <img
                    src={defaultProfilePicture}
                    className="conversationImage"
                    draggable="false"
                  />
                ) : (
                  <img
                    src={`/me/avatar/${friend.picture.filename}`}
                    className="conversationImage"
                    draggable="false"
                  />
                )}
                <span className="conversationName">{friend.firstname}</span>
              </div>
            </div>
          ) : (
            <h4>Couldn't Retrieve Your Account</h4>
          )}
        </Fragment>
      )}
    </>
  );
};

export default Conversation;
