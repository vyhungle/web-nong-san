import React from "react";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

import { GET_PRODUCTS } from "../../../graphql/query";


export default function Products() {
  const { loading, data: { getProducts: products } = {} } = useQuery(
    GET_PRODUCTS,
    { pollInterval: 500 }
  );

  const AddProduct = (product) => {
    var cartProduct = {};
    var products = [];
    if (localStorage.getItem("product") === null) {
      var p = {};
      p.product = product;
      p.number = 1;
      products.push(p);
      cartProduct.products = products;
    } else {
      var values = JSON.parse(localStorage.getItem("product"));
      var flag = true;
      values.products.map((p) => {
        if (p.product.id === product.id) {
          p.number++;
          flag = false;
        }
      });
      if (flag === true) {
        var p = {};
        p.product = product;
        p.number = 1;
        values.products.push(p);
      }
      cartProduct = values;
    }
    localStorage.setItem("product", JSON.stringify(cartProduct));
  };
  return (
    <Container>
      {products &&
        products.map((product, index) => (
          <CardItem key={index}>
            <Image src={product.image} />
            <CardBody>
              <p style={{whiteSpace:"nowrap",overflow:"hidden"}}>{product.name}</p>
              <p style={{whiteSpace:"nowrap",overflow:"hidden"}}>{product.producer.name}</p>
              <p>{product.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} vnđ</p>
              <ButtonBuy onClick={() => AddProduct(product)}>Mua</ButtonBuy>
            </CardBody>
          </CardItem>
        ))}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 20px;
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
  background-color: white;
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
  :hover {
    background-color: #007873;
  }
`;
