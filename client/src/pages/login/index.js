import React from "react";
import styled from "styled-components";

import FormLogin from "./components/form";

export default function index() {
  return (
    <Container>
      <BoxContainer>
        <Title>Đăng nhập</Title>
        <FormLogin />
        
      </BoxContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #1da1f3; */
  margin: 0;
  background-color: white;
  height: 100vh;
`;
const BoxContainer = styled.div`
  /* width: 400px;
  height: 400px; */
  background-color: white;
`;
const Title = styled.h1`
  font-size: 700;
  text-align: center;
`;

