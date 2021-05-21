import React from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import { GET_PRODUCTS } from "../../../graphql/query";

export default function Products() {
  const { loading, data: { getProducts: products } = {} } = useQuery(
    GET_PRODUCTS,
    { pollInterval: 500 }
  );
  return (
    <Container>
      {products &&
        products.map((product, index) => (
          <CardItem key={index}>
            <Image src={product.image} />
            <CardBody>
              <p>{product.name}</p>
              <p>{product.producer.name}</p>
              <p>{product.price}</p>
              <ButtonBuy>Mua</ButtonBuy>
            </CardBody>
          </CardItem>
        ))}
    </Container>
  );
}

const Container = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
`;

const CardItem = styled.div`
  width: 300px;
  height: 400px;
  border: 1px solid gainsboro;
  border-radius: 20px;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  overflow: hidden;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 10px;
  > p {
    margin: 0;
  }
`;

const ButtonBuy = styled.button`
  width: 70px;
  border-radius: 15px;
  height: 30px;
  border: solid 1px gainsboro;
  background-color: #00b5ad;
  position: relative;
  right: -210px;
  top: -15px;
  color: white;
  font-weight: 700;
  :hover{
    background-color: #007873;
  }
`;
