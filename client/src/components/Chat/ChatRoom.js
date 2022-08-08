import React, { Fragment, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../App.css";
import Conversation from "./Conversation";
import Message from "./Message";
import Matched from "./Matched";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUser } from "../../state/actions/currentUserAction";
import LoadingGif from "../Dashboard/LoadingGif";
import axios from "axios";
import {io} from "socket.io-client";

const ChatRoom = ({ getCurrentUser, user }) => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket= useRef();


  useEffect(() => {
        socket.current = io("ws://localhost:9000");
        socket.current.on("getMessage", datas => {
        setArrivalMessage({
          sender: datas.senderId,
          text: datas.text,
          createdAt: Date.now()
        })
        })
  }, [])

  useEffect(() => {
    arrivalMessage && currentConversation?.members.includes(arrivalMessage.sender) && setMessages((prev)=>[...prev, arrivalMessage])
  }, [arrivalMessage, currentConversation])

  // useEffect(() => {
  //   socket.current.emit("addUser", user.user._id);
  //   socket.current.on("getUsers", users=> {
  //     setMatchedUsers(
  //       user.user.matched.filter((f) => users.some((u) => u.userId === f))
  //     );
  //   })

  // }, [user])

  useEffect(() => {
    socket.current.emit("addUser", user.user._id);
    // socket.current.on("getUsers", (users) => {
    //   console.log(users);
    // });
  }, [user]);

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user?.user?._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user.user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try{
        const res = await axios.get("/messages/" + currentConversation?._id);
        setMessages(res.data)
      }catch(err)
      {
        console.error(err.message);
      }
    }
    getMessages()
  }, [currentConversation, newMessage])
  

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behaviour: "smooth", block: 'nearest', inline: 'start'})
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessageObj = {
      conversationId: currentConversation._id,
      sender: user.user._id,
      text: newMessage
    }

    const receiverId = currentConversation.members.find(
      (member) => member !== user.user._id
      );

    socket.current.emit("sendMessage", {senderId: user.user._id, receiverId: receiverId, text: newMessage})

    try{
      const res = await axios.post("/message", newMessageObj);
      setMessages([...messages], res.data);
      setNewMessage("");
    }catch(err){
      console.error(err)
    }
  }

  return (
    <Fragment>
      {user.isLoading === true ? (
        <LoadingGif />
      ) : (
        <Fragment>
          {user.length !== null || undefined || {} ? (
            <Container fluid>
              <Row className="justify-content-center">
                <Col
                  className="chatbox chatCol1"
                  xs={2}
                >
                  <h6>Active Chats</h6>
                  <input placeholder="search" />
                  <br />
                  {conversations.map((c) => (
                    <div onClick={()=>setCurrentConversation(c)}>
                    <Conversation conversation={c} key={conversations._id} currentUser={user}/>
                    </div>
                  ))}
                </Col>
                <Col
                  className="chatbox chatCol2"
                  xs={8}
                >
                  {
                  currentConversation ?
                  <>
                  <div className="chatbox chatbox3">
                    {messages.map((m) => (
                      <div ref={scrollRef}>
                    <Message key={messages._id} currentUser={user} currentConversation={currentConversation} message={m} own={m.sender === user.user._id}/>
                    </div>
                    ))}
                                  
                  </div>
                  <div className="messageInputOuter">
                    <textarea
                      className="messageInput"
                      placeholder="..."
                      onChange={(e)=> setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button className="messageInputButton" onClick={handleSubmit}>Send</button>
                  </div>
                  </> : <span className="noCurrentConversation">Click on a conversation to start chatting!</span>
                  }
                </Col>
                <Col
                  className="chatbox chatCol3"
                  xs={2}
                >
                  <Matched key={Math.floor(Math.random() * 1000000)}  currentUser={user} currentConversation={currentConversation} setCurrentConversation={setCurrentConversation}/>
                </Col>
              </Row>
            </Container>
          ) : (
            <h4>Couldn't Retrieve Your Account</h4>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

ChatRoom.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { getCurrentUser })(ChatRoom);
