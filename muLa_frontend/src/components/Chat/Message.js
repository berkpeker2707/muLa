import React, { useEffect, useState } from 'react';
import "../../App.css";
import { format } from 'timeago.js';
import axios from 'axios';

const Message = ({message, own, currentUser, currentConversation}) => {

  const[friendsData, setFriendsData] = useState(null)

  

  useEffect(() => {
    
    const getFriendData = async () => {
      try{
        const receiverId = await currentConversation.members.find(
    (member) => member !== currentUser.user._id
    );
        const res = await axios.get("/user/picture/" + receiverId);
        setFriendsData(res.data)
      }catch(err)
      {
        console.error(err.message);
      }
    }
    getFriendData()
  }, [currentConversation, message.conversationId])

    console.log(friendsData)
    return (
        <div className={own ? "activeConversation own" : "activeConversation"}>
            <div className="activeConversations">
              <div className="activeConversation">
                <div className="activeConversationTop">
                  {
                  own? <img
                    className="activeConversationImage"
                    src={`/me/avatar/${currentUser?.user?.picture?.filename}`}
                    alt="activeConversationImage"
                  /> : <img className="activeConversationImage"
                  src={`/me/avatar/${friendsData?.picture?.filename}`}
                  alt={""}/>
                  }
                  <p className="activeConversationText">{message.text}</p>
                </div>
                <div className="activeConversationBottom"><p className="activeConversationTime">{format(message.createdAt)}</p></div>
              </div>
            </div>
            </div>
    )
}

export default Message;