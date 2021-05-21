import React from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/react-hooks";

import { REGISTER } from "../../../graphql/mutation";
import { AuthContext } from "../../../auth";

var errors = {};
export default function FRegister() {
  const context = React.useContext(AuthContext);
  const [Register, { loading }] = useMutation(REGISTER);
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
      }}
      onSubmit={(values) => {
        errors = {};
        Register({
          variables: values,
          update(proxy, { data: { register: userData } = {} }) {
            if (userData.error.length > 0) {
              userData.error.map((e) => {
                if (e.field === "username") {
                  errors.username = e.message;
                } else if (e.field === "password") {
                  errors.password = e.message;
                }else if (e.field === "confirmPassword") {
                  errors.confirmPassword = e.message;
                }else if (e.field === "email") {
                  errors.email = e.message;
                }
              });
            } else {
              context.login(userData);
            }
          },
        });
      }}
    >
      {(formProps) => (
        <Form onSubmit={formProps.handleSubmit}>
          <Container>
            <Field
              type="username"
              name="username"
              placeholder="Tài khoản"
              value={formProps.values.username}
              onChange={formProps.handleChange("username")}
            />
            {errors.username && <Error>{errors.username}</Error>}
            <Field
              type="email"
              name="email"
              placeholder="Email"
              value={formProps.values.email}
              onChange={formProps.handleChange("email")}
            />
            {errors.email && <Error>{errors.email}</Error>}
            <Field
              type="text"
              name="password"
              placeholder="Mật khẩu"
              value={formProps.values.password}
              onChange={formProps.handleChange("password")}
            />
            {errors.password && <Error>{errors.password}</Error>}
            <Field
              type="text"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              value={formProps.values.confirmPassword}
              onChange={formProps.handleChange("confirmPassword")}
            />
            {errors.confirmPassword && <Error>{errors.confirmPassword}</Error>}
            <BoxButton>
              <ButtonSubmit type="submit">
                {loading ? "loading" : "Đăng ký"}
              </ButtonSubmit>
              <TextRegister href="/login">
                Về trang đăng nhập
              </TextRegister>
            </BoxButton>
          </Container>
        </Form>
      )}
    </Formik>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

const ButtonSubmit = styled.button`
  width: 200px;
  height: 40px;
  border-radius: 15px;
  border: none;
  margin: 5px;
  margin-top: 20px;
  background-color: #1da1f3;
  color: white;
  font-weight: 700;
  margin-left: 5px;
`;

const Field = styled.input`
  height: 40px;
  width: 350px;
  border-radius: 10px;
  border: solid 1px gainsboro;
  margin: 5px;
  padding: 10px;
  outline: none;
  margin-bottom: 10px;
`;

const BoxButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TextRegister = styled.a`
  text-decoration: none;
  color: #1da1f3;
  position: relative;
  top: 7px;
`;

const Error = styled.p`
  font-size: 15px;
  color: #ff9494;
  font-weight: 600;
  margin: 0;
  margin-left: 5px;
`;
