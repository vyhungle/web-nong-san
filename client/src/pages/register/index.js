import React from "react";
import styled from "styled-components";

import FormRegister from "./components/formRegister";

export default function index() {
  return (
    <Container>
      <BoxContainer>
        <Title>Đăng ký</Title>
        <FormRegister />
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
