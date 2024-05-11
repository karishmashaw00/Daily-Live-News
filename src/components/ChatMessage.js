import React from 'react'
import Avatar from "react-avatar";

const ChatMessage = ({item}) => {
  return (
    <div className='flex items-center'>
      <div>
      <Avatar
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  size={25}
                  round={true}
                />
      </div>
      <div className="flex items-center">
        <h1 className='ml-2 font-bold text-sm'>{item.name}</h1>
        <p className='ml-2 py-2 text-sm'>{item.message}</p>
      </div>
    </div>
  )
}

export default ChatMessage
