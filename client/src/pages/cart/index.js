import React from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import { Form, Formik } from "formik";

import TopBar from "../../components/topBar";
import { CREATE_BILL } from "../../graphql/mutation";
import ButtonDelete from "./components/buttonDelete";

export default function Index() {
  const [createBill] = useMutation(CREATE_BILL);
  var values = JSON.parse(localStorage.getItem("product"));
  var ref = values !== null ? values.products : [];
  const [products,setProducts]=React.useState(ref)
  const productsChange=(value)=>{
    setProducts(value);
  }
  const Total = (products) => {
    var total = 0;
    products.map((p) => {
      total = total + p.number * p.product.price;
    });
    return total;
  };

  const getTicket = (products) => {
    const tickets = [];
    products.map((p) => {
      var number = p.number.toString();
      var product = {};
      product.id = p.product.id;
      product.name = p.product.name;
      product.image = p.product.image;
      product.price = p.product.price;
      var ticket = {};
      ticket.number = number;
      ticket.product = product;
      tickets.push(ticket);
    });
    return tickets;
  };

  if (products === null) return <div></div>;
  return (
    <div>
      <TopBar />
      <BoxContainer>
        <Container>
          {products &&
            products.map((p, index) => (
              <Item key={index}>
                <img src={p.product.image} />
                <p>{p.product.name}</p>
                <p>
                  giá:{" "}
                  {p.product.price
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                  vnđ
                </p>
                <p>số lượng: {p.number}</p>
                <ButtonDelete id={p.product.id} productsChange={productsChange}/>
              </Item>
            ))}
        </Container>
        <BoxTotal>
          <p>
            total:{" "}
            {Total(products)
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
            vnđ
          </p>
          <Formik
            initialValues={{
              pay: "Thanh toán tại nhà",
              ticket: [],
            }}
            onSubmit={(values) => {
              values.ticket = getTicket(products);
              console.log(values);
              createBill({
                variables: {
                  pay: values.pay,
                  ticket: values.ticket,
                },
              });
              localStorage.removeItem("product");
              setProducts([])
            }}
          >
            {(formProps) => (
              <Form onSubmit={formProps.handleSubmit}>
                <Select
                  name="pay"
                  id="pay"
                  value={formProps.values.pay}
                  onChange={formProps.handleChange}
                >
                  <option>Thanh toán tại nhà</option>
                  <option>Thẻ tín dụng, thẻ ghi nợ</option>
                </Select>
                <Button type="submit">Đặt hàng</Button>
              </Form>
            )}
          </Formik>
        </BoxTotal>
      </BoxContainer>
    </div>
  );
}

const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Container = styled.div`
  width: 80%;
  background-color: white;
  margin-top: 20px;
  /* padding: 10px; */
  border: solid 0.75px gainsboro;
`;
const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  margin: 5px;
  border-bottom: solid 0.5px gainsboro;

  > img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 20px;
    margin-left: 10px;
  }
  > p {
    margin: 10px;
  }
`;

const BoxTotal = styled.div`
  border: solid 0.75px gainsboro;
  padding: 10px;
  background-color: white;
  height: 100px;
  width: 80%;
  margin-top: 10px;
  > p {
    font-weight: 700;
  }
`;

const Select = styled.select`
  width: 200px;
  height: 44px;
  border-radius: 10px;
  outline: none;
`;

const Button = styled.button`
  height: 44px;
  margin-left: 5px;
  border-radius: 10px;
  border: solid 0.5px gainsboro;
  background-color: #00b5ad;
  color: white;
  font-weight: 700;
`;
