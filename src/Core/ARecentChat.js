import React from 'react'
import './styles/aRecentChat.css'

export default function ARecentChat({chat, chatTapped}) {
  console.log(chat)
  return (
        <>
        <div className='message-info' onClick={() => {chatTapped(chat._id)}}>
            <h3>{chat.messagers[1]}</h3>
            <p>time</p>
        </div>
        <h2>message</h2>
        </>
  )
}



