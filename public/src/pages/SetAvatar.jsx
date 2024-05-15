import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SetAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
// import { isUndefined } from "util";
export default function SetAvatar() {
  const api = "https://api.multiavatar.com/apikey=AygGs0zIUmunhe";
//   const corsProxy = "https://cors-anywhere.herokuapp.com";
  const navigate = useNavigate();
  const [avatars, SetAvatars] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (!localStorage.getItem("react-chat-app")) {
      navigate("/");  
    }
  }, []);
  
  const setProfilePicture = async () => {
    if(selectedAvatar===" "){
        toast.error("Please select an avatar",toastOptions)
    }
    else{
        const user= await JSON.parse(localStorage.getItem("react-chat-app"));
        

       try{
        const {data}=await axios.post(`${SetAvatarRoute}/${user._id}`,{
            username:user.username,
            image:avatars[selectedAvatar],
        });
        if(data.isSet){
            user.isAvatarImageSet=true;
            user.avatarImage=data.image;
            localStorage.setItem("react-chat-app",JSON.stringify(user));
            navigate('/')
        }
        else{
            toast.error("Error setting avatar.Please  Try Again",toastOptions)
        }}
        catch(error){
            console.log(error);
        }
        
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = Buffer.from(image.data);
          data.push(buffer.toString("base64"));
        }
        SetAvatars(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching avatars:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
    {
        isloading ?  <Container>
            <img src={loader} alt="loader" className="loader"/>
            </Container>:( 
                <Container>
                <div className="title-container">
                  <h1>Pick an avatar for your profile picture</h1>
                </div>
                <div className="avatars">
                  {avatars.map((avatar, index) => {
                    return (
                      <div
                        key={index}
                        className={`avatar ${
                          selectedAvatar === index ? "selected" : ""
                        }`}  onClick={() => setSelectedAvatar(index)}
                      >
                        <img
                          src={`data:image/svg+xml;base64,${avatar}`}
                          alt="avatar" onClick={() => setSelectedAvatar(index)}
                        />
                      </div>
                    );
                  })}
                </div>
                <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>
              </Container>
            )
    }
      
      ;
      <ToastContainer />
    </>
  );
}

const Container = styled.div`

display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
gap:3rem;
background-color:#131324;
height:100vh;
width:100vw;
.loader{
    max-inline-size:100%;
 }
    .title-container{
        h1{
            color:white;
        }   
    } 
    .avatars{
        display:flex;
        gap: 2rem;
        .avatar {
            border:0.4rem solid transparent;
            padding:0.4rem;
            border-radius:5rem;
            display:flex;
            justify-content:center;
            align-items:center;
            transition:0.5s ease-in-out;
            cursor: pointer;
            img{
                height:6rem;
                
                
            }
        }
            .selected{
                border:0.4rem solid #4e0eff;

            }
        }
    
    .submit-btn {
        background-color: #4e0eff;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover {
          background-color: #4e0eff;
        }
      }

`;
