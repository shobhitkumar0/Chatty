import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event) => {
    
    let message = msg;
    message += event.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} height="290px"/>}
        </div>
      </div>
      <form className="input-container" 
       onSubmit={(e) => sendChat(e)}>
      
        <input
          type="text"
          placeholder="type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
      
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0rem 2rem;
  padding-bottom:2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  // .emoji 
  .button-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: white;
    .emoji {
      position: relative; 
      // // .center {
      //   position: absolute;
      //   top: 50%;
      //   width: 80%;
      //   text-align: center;
      //   font-size: 18px;
      // // }
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      

      .EmojiPickerReact{
        position: absolute;
        overflow:hidden;
        font-size: 18px;
        
        background-color:#080420;
        top: -300px;
       
        box-shadow:0 5px 10px #9a86f3;
        border-color: #9186f3;
       .epr-main{
        height:300px;
       }
        .epr-emoji-category-label{
          background-color:#080420;
          button{
            filter:contrast(0);
          }
        }
        .epr_q53mwh.epr_vl50xg.epr_-3yva2a{
          display:none;
        }
        .EmojiSearch{
          background-color:transparent;
          border-color:#9186f3;
        }
        emoji-group:before{
          background-color:#080420;
        }
      } 
      
      
      
    }
  }
  
        // background-color: #080420;
        // box-shadow: 0 5px 10px #9a86f3;
        // border-color: #9a86f3;
        // .emoji-scroll-wrapper::-webkit-scrollbar {
        //   background-color: #080420;
        //   width: 5px;
        //   &-thumb {
        //     background-color: #9a86f3;
        //   }
        // }
        // .emoji-categories {
        //   button {
        //     filter: contrast(0);
        //   }
        // }
        // .emoji-search {
        //   background-color: transparent;
        //   border-color: #9a86f3;
        // }
        // .emoji-group:before {
        //   background-color: #080420;
        // }
      
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      // height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;