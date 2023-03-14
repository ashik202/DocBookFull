import React,{useState} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useSelector } from 'react-redux';
import {userdata} from '../../redux/reducer/UserSlice'

const Chat = () => {
    const user = useSelector((state) => state.user.token);
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
    const {readyState, sendJsonMessage } = useWebSocket(user ? "ws://127.0.0.1:8000/" : null,{
      queryParams: {
        token: user ? user.access : ""}}
        
        ,{
          onOpen: () => {
            console.log("Connected!");
          },
          onClose: () => {
            console.log("Disconnected!");
          },
          // New onMessage handler
          onMessage: (e) => {
              const data = JSON.parse(e.data);
              switch (data.type) {
                case 'chat_message_echo':
                setMessageHistory((prev) => prev.concat(data));
                 break;
                case "welcome_message":
                  setWelcomeMessage(data.message);
                  break;
                default:
                  console.log("Unknown message type!");
                  break;
              };
            }
        });

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
        name="name"
        placeholder="Name"
        onChange={handleChangeName}
        value={name}
        className="shadow-sm sm:text-sm border-gray-300 bg-gray-100 rounded-md"
      />
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
          <div className="border border-gray-200 py-3 px-3" >
            {message.name}: {message.message}
          </div>
        ))}
      </ul>
  </div>
  
  )
}

export default Chat