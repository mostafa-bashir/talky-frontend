import React, { useEffect, useState } from 'react'
import AMessage from './AMessage'
import axios from 'axios'
import './styles/achat.css'

export default function AChat({chat}) {

  const [typedMessage, setTypedMessage] = useState('')

  const handleTypedMessage = (event) =>{
    setTypedMessage(event.target.value);
  }

  async function sendMessage() {
    try {
      const response = await axios.post(
        'http://localhost:8000/message/sendmessage',
        {
          chatId: chat.chatId,
          message: typedMessage,
        },
        {
          headers: {
            authorization: localStorage.getItem('token')
          }
        }
      );
      console.log(response.data);
      // nndef hena el message le array el messages
      setTypedMessage('')
      // Handle the response data as needed
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
  useEffect(() => {
    async function getMessages() {
      try {
        const response = await axios.get(
          'http://localhost:8000/chat/getchat',
          {
              chatId: chat.chatId,

            headers: {
              authorization: localStorage.getItem('token')
            }
          }
        );
        console.log(response.data,23432423432); // Log the response data
        // Handle the response data as needed
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  
    getMessages(); // Call the async function immediately inside useEffect
  
    // Add dependencies if needed (e.g., [chat.chatId])
  }, []);
  
  

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8000/chat/getchat?chatId=${chat.chatId}`, {
          headers: {
            authorization: localStorage.getItem('token')
          }
        });
        console.log(response.data);
        // Handle the response data as needed
      } catch (error) {
        console.error('Error fetching chat:', error);
      }
    }
  
    fetchData(); // Call the async function immediately
  
    // Add dependencies if needed (e.g., [chat._id])
  }, []);
  


  return (
    <div >
      {/* header */}
        <div className='AChatHeader'>
            {chat.name}
        </div>

        {/* messages */}
        <AMessage />
        <AMessage />
        <AMessage />
        <AMessage />


        <div className='txt-Field-Div'>
          <input placeholder='Type your message' value={typedMessage} onChange={handleTypedMessage}/>
          <button onClick={sendMessage}>send</button>
        </div>
    </div>



  )
}
