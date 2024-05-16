import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { Link ,useNavigate} from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { LoginRoute } from "../utils/APIRoutes";
export default function Login() {  
 
  const [values,setValues]=useState({
    username:"",
    password:"",
   
  })
  const handleChange = (event) => {
    console.log("Handle Change"); 
    setValues({...values,[event.target.name]:event.target.value});
  };
  const navigate=useNavigate();
  const toastOptions={
    position:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark",
  }
 
  useEffect(() => {
    if (localStorage.getItem("react-chat-app")) {
      navigate("/");
    }
  }, []);
  
  const handleSubmit = async (event) => {
   
    event.preventDefault();
    if (handleValidation()) {
      const {  username, password } = values;
      console.log("handleSubmit part 1")
      const { data } = await axios.post(LoginRoute, {
        username,
        password,
      },{user:true});
       console.log("Data is here for session token",data)
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      console.log("Handle Submit Clicked 2");
      if (data.status === true) {
        console.log(data.user);
        localStorage.setItem(
          "react-chat-app",
          JSON.stringify(data.usercheck)
        );
        console.log("Handle Submit Clicked and Navigate 3"); 
        navigate("/");

      }
    }
  };
  const handleValidation =  () => {
   
    const { password, username } = values;
    if (password === ""||username==="") {
      toast.error(
        "UserName and Password is required.",
        toastOptions
      );
      return false;
    } 
    return true;
  };

 
  return (
    <>
    <FormContainer>
      <form action="" onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h1>Chatty</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={(e) => handleChange(e)}
          min="3"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Login</button>
        <span>
          Don't have an account ? <Link to="/register">Register</Link>
        </span>
      </form>
    </FormContainer>
    <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
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
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

