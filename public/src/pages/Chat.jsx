import React,{useState,useEffect,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";
import { allUsersRoute,host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client";
function Chat() {
  const socket=useRef();
  const navigate=useNavigate();
  const [contacts,setContacts]=useState([]);
  const[currentUser,setCurrentUser]=useState();
  const [isLoading, setIsLoading] = useState(true);
  const[currentChat,setCurrentChat]=useState("");
  const[isloaded,setIsLoaded]=useState(false);
  useEffect(()=>{
    async function fetchData(){
    if (!localStorage.getItem("react-chat-app")) {
      navigate("/login");  
    }else{
      setCurrentUser(await JSON.parse(localStorage.getItem("react-chat-app")));
      setIsLoaded(true);
    }}fetchData();
    
  },[]);
  useEffect(()=>{
if(currentUser){
  socket.current=io(host);
  socket.current.emit("add-user",currentUser._id);
}
  },[currentUser]);
  useEffect(()=>{
    async function fetchData(){
    if(currentUser){
      setIsLoading(true);
      if(currentUser.isAvatarImageSet){
        const data =await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
        setIsLoading(false);
      }
      else{
        navigate("/setAvatar");
      }}
    }fetchData();
  },[currentUser]);
  useEffect(() => {
  // This will log the updated state after re-render
}, [contacts]);
const handleChatChange=(chat)=>{  
  setCurrentChat(chat );
}
  return (
    <Container>
    {isLoading ? (
      <p>Loading contacts...</p> // Display this message while contacts are being fetched
    ) : (
      <div className="container">
     
      <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
      {
        isloaded && currentChat===""?(
         <Welcome currentUser={currentUser} />):

         (<ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>)
      }
     
      
      </div>
    )}
     
    </Container>
  )
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat