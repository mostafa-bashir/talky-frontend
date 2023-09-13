import React, { useEffect, useState } from 'react'
import './styles/chats.css'
import ARecentChat from './ARecentChat'
import axios from 'axios'
import AChat from './AChat'
import io from 'socket.io-client';


export default function Chats() {

    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState({});
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const [myId, setMyId] = useState('');
    const [textToSend, setTextToSend] = useState('')
    const [showUsers, setShowUsers] = useState(false);
    const [users,setUsers] = useState([]);



    useEffect(() => {
      // Connect to the Socket.io server
      const socket = io('http://192.168.1.153:8000'); // Replace with your server URL


      
      // Add event listeners for socket events
      socket.on(`chat-${activeChat.chatId}`, (data) => {
        console.log('Received message:', data);
        // Handle the received message in your React component
        setMessages([...messages, data])
      });
  
      // socket.emit('active', {myId});

      // Clean up the socket connection when the component unmounts
      return () => {
        socket.disconnect();
      };
    }, [activeChat.chatId, messages]);
  





    useEffect(() => {
        async function fetchData() {
          try {
            const response = await axios.get('http://192.168.1.153:8000/chat/getchats', {
              headers: {
                authorization: localStorage.getItem('token')
              }
            });
            setChats(response.data.chats)
            setMyId(response.data.myId);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
    
        fetchData(); // Call the async function immediately inside useEffect
    
        // Add dependencies if needed (e.g., [localStorage.getItem('token')])
      }, []);

      async function chatTapped(chat) {

        try {

          const response = await axios.get(
            `http://192.168.1.153:8000/chat/getchat?chatId=${chat.chatId}`,
            {
              headers: {
                authorization: localStorage.getItem('token')
              }
            }
          );

          console.log(chat)
          setActiveChat(chat);
          setShowChat(true);
          setMessages(response.data.messages)
        } catch (error) {
          console.error('Error creating chat:', error);
        }
      }


      function handleTextToChange(event){
        setTextToSend(event.target.value)
      }

      async function createChat(user){

        try{
          const response = await axios.post(
            'http://192.168.1.153:8000/chat/createchat',
            {
              usersId: [user._id],
            },
            {
              headers: {
                authorization: localStorage.getItem('token'),
              },
            }
          );

          console.log(response.data.chat)
          setActiveChat(response.data.chat)
          setShowChat(true);
        } catch (error) {
          console.error('Error sending message:', error);
        }
      }


      async function sendMessage(event) {
        if (event.key === 'Enter') {
          try {
            const response = await axios.post(
              'http://192.168.1.153:8000/message/sendmessage',
              {
                chatId: activeChat.chatId,
                message: textToSend,
              },
              {
                headers: {
                  authorization: localStorage.getItem('token'),
                },
              }
            );
            console.log(response.data);
            setTextToSend('');
            // Handle the response data as needed
          } catch (error) {
            console.error('Error sending message:', error);
          }
        }
      }
      
      async function getUsers(){
        try {
          const response = await axios.get('http://192.168.1.153:8000/chat/getUsers', {
            headers: {
              authorization: localStorage.getItem('token')
            }
          });
          
          console.log(response.data.users)
          setUsers(response.data.users);
          setShowUsers(true);
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }


      return (
        <div>
          <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
          <div className="container">
            <div className="row clearfix">
              <div className="col-lg-12">
                <div className="card chat-app">
                  <div id="plist" className="people-list">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <button onClick={getUsers}>Users</button>
                      </div>
                    </div>

                    <ul className="list-unstyled chat-list mt-2 mb-0">

                    {!showUsers ? (
                        chats.map((chat) => (
                          <li className="clearfix" key={chat.chatId} onClick={() => { chatTapped(chat) }}>
                            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
                            <div className="about">
                              <div className="name">{chat.messagerName}</div>
                              <div className="status"> <i className="fa fa-circle offline" /> left 7 mins ago </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        users.map((user) => (
                          <li className="clearfix" key={user.chatId} onClick={() => { createChat(user) }}>
                            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
                            <div className="about">
                              <div className="name">{user.name}</div>
                            </div>
                          </li>
                        ))
                      )}

                      
                      
                    </ul>
                  </div>
                  { (showChat && 
                    <div className="chat">
                      <div className="chat-header clearfix">
                        <div className="row">
                          <div className="col-lg-6">
                            <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                              <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                            </a>
                            <div className="chat-about">
                              <h6 className="m-b-0">{activeChat.messagerName}</h6>
                              <small>Last seen: 2 hours ago</small>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                      <div className="chat-history">
                        <ul className="m-b-0">

                          {messages.map( (message) => (
                            <li className="clearfix" key={message._id} >
                            <div className="message-data text-right">
                              <span className="message-data-time">{message.time}</span>
                              <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                            </div>
                            {/* <div className="message other-message float-right"> {message.message} </div> */}
                            <div className={"message "+ message.senderId === myId ? "my-message": " other-message float-right"}> {message.message} </div>
                            </li>
                          ))
                          }
                        </ul>
                      </div>
                      <div className="chat-message clearfix">
                        <div className="input-group mb-0">
                          <div className="input-group-prepend">
                            <button onClick={sendMessage}><span className="input-group-text"><i className="fa fa-send" /></span></button>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter text here..."
                            value={textToSend}
                            onChange={handleTextToChange}
                            onKeyPress={(event) => {
                              if (event.key === 'Enter') {
                                sendMessage(event);
                              }
                            }}
                          />                   
                        </div>
                      </div>
                    </div>
                  )
                    }
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}
