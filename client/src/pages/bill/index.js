import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { Table } from "react-bootstrap";
import moment from "moment";

import TopBar from "../../components/topBar";
import { GET_MY_BILLS } from "../../graphql/query";

export default function Index() {
  const { data: { getMyBills: bills } = {} } = useQuery(GET_MY_BILLS, {
    pollInterval: 500,
  });

  const getSP=(values)=>{
    var ref="";
    values.map((p)=>{
      ref=ref+p.product.name+" x "+p.number+", "
    })
    return ref
  }
  return (
    <div>
      <TopBar />
      <BoxContainer>
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th colSpan="2" >Sản phẩm đã mua</th>           
                <th>Ngày mua</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>                     
             {bills && bills.map((bill,index)=>(
              <tr key={index}>
                <td>{bill.id}</td>
                <td colSpan="2">{getSP(bill.cargoTicket)}</td>
                <td>{moment(bill.date).subtract(1, 'days').calendar()}</td>
                <td>Đang chờ xử lý</td>
              </tr>
             ))}
            </tbody>
          </Table>
        </Container>
      </BoxContainer>
    </div>
  );
}

const BoxContainer = styled.div`
  margin-top: 20px;
  color: black;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  color: black;
  width: 80%;
  background-color: white;
`;
