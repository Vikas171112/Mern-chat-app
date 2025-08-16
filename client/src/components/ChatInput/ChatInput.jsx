import React from 'react'

function ChatInput({placeholder}) {
  return (
    <div className='flex align-center'>
        <input type="text" placeholder={placeholder} className="input input-lg w-full outline-none" />
        <button className="btn btn-xs py-6">Send</button>
    </div>
  )
}

export default ChatInput