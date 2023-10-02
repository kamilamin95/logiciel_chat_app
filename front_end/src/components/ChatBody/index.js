import React from "react";
// import {useNavigate} from 'react-router-dom'

function ChatBody({ messages, lastMessageScroll, typingStatus }) {
  return (
    <>
      <div className="message__container">
        {messages.map((message) =>
          message.name === sessionStorage.getItem("firstName") ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageScroll} />
      </div>
    </>
  );
}

export default ChatBody;
