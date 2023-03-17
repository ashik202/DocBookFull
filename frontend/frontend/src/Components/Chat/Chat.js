import React,{useState} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useSelector } from 'react-redux';
import {userdata} from '../../redux/reducer/UserSlice'
import { useParams } from "react-router-dom";

const Chat = () => {
  const {conversationName}  = useParams()
  
  console.log(conversationName);
    const user = useSelector((state) => state.user.token.access);
    console.log(user);
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [message, setMessage] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    const [name, setName] = useState("");
    function handleChangeMessage(e) {
      setMessage(e.target.value);
    }
    
    function handleChangeName(e) {
      setName(e.target.value);
    }
    function handleSubmit() {
      sendJsonMessage({
        type: "chat_message",
        message,
        name
      });
      setName("");
      setMessage("");
    }
    const {readyState, sendJsonMessage } = useWebSocket(user ? `ws://127.0.0.1:8000/${conversationName}/` : null, {
      queryParams: {
        token: user ? user : "",
      },
  onOpen: () => {
    console.log("Connected!");
  },
  onClose: () => {
    console.log("Disconnected!");
  },
  onMessage: (e) => {
    const data = JSON.parse(e.data);
    switch (data.type) {
      case "welcome_message":
        setWelcomeMessage(data.message);
        break;
      case "chat_message_echo":
          setMessageHistory((prev) => prev.concat(data.message))
          break
      case "last_50_messages":
          setMessageHistory(data.messages)
          break

      default:
        console.log("Unknown message type!");
        break;
      
    };
  }
});
function formatMessageTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString().slice(0, 4);
}
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated"
  }[readyState];
  return (
    <div>
   
      <span>The WebSocket is currently {connectionStatus}</span>
      <p>{welcomeMessage}</p>
     
      <input
        name="message"
        placeholder="Message"
        onChange={handleChangeMessage}
        value={message}
        className="ml-2 shadow-sm sm:text-sm border-gray-300 bg-gray-100 rounded-md"
      />
      <button className="ml-3 bg-gray-300 px-3 py-1" onClick={handleSubmit}>
        Submit
      </button>
      <hr />
      <ul>
       
      {messageHistory.map((message) => (
        
        message.from_user.first_name === user.firstname?
       <div className="  py-3 px-3 flex justify-end " >
         <div className="bg-white rounded-2xl shadow-2xl  text-left pr-24  p-1 sm:p-2"> 
         <p className="text-xs font-bold "> {message.from_user.username}</p>
         <p className=" text-sm ">{message.content}  <span className="text-xs font-semibold ml-10">{formatMessageTimestamp(message.timestamp)}</span></p> 
      
           </div>
        
       </div>:<div className=" py-3 px-3 flex justify-start" >
         <div className="bg-white rounded-2xl  shadow-2xl text-left pr-16  p-1 sm:p-2">
         <p className="text-xs font-bold "> {message.from_user.username}</p>
          <p className=" text-sm ">{message.content} <span className="text-xs mx-4  font-semibold ">{formatMessageTimestamp(message.timestamp)}</span></p> 
          <p>  </p>
          
         </div>
       </div>
       
   
       
       
     ))}

      </ul>
  </div>
  
  )
}

export default Chat