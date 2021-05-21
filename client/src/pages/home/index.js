import React from "react";
import styled from "styled-components";

import TopBar from "../../components/topBar";
import Products from "./components/products";

export default function index() {
  return (
    <div>
    <TopBar />
      <Container>
        <Products />
      </Container>
    </div>
  );
}

const Container = styled.div `
  display: flex;
  justify-content: center;
`;
