import React, { useState, useEffect } from "react";
import styled from "styled-components";
import robot from "../assets/robot.gif";
export default function Welcome(currentUser) {
  console.log("welcome page ");
  
  return (
    
    <Container>
      <img src={robot} alt="" />
      <h1>
        Welcome, <span>{currentUser.currentUser.username }!</span>
      </h1>
      <h3>Please select a chat to Start Messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;