import React from 'react'
import styled from 'styled-components'

export default function ButtonDelete(props) {
    const deleteProduct=(id)=>{
        var values = JSON.parse(localStorage.getItem("product"));
        values.products=values.products.filter(x=>x.product.id!==id);
        props.productsChange(values.products)
        localStorage.setItem("product", JSON.stringify(values));
    }
    return (
        <Container onClick={()=>deleteProduct(props.id)}>
            Xóa
        </Container>
    )
}



const Container=styled.button `
    width: 60px;
    height: 40px;
    background-color: red;
    position: absolute;
    right: 200px;
    border-radius: 15px;
    border:solid .5px gainsboro;
    color: white;
    font-weight: 700;
`