import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

interface Product  {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  main_image: string;
 other_images: string[];


}


const Wrapper = styled(Link)`
color: black;
text-decoration: none;
display: flex;
flex-direction: column;
width:23%;
cursor: pointer;

 @media only screen and (max-width: 768px) 
  {
    width: 100%;

  }
`

const Img = styled.img`
height: 100%;
width: 100%;
object-fit: contain;
`

const ImgWrapper = styled.div`
height: 60%;
width: 100%;
padding: 8px 20px;


`

const InfoSec = styled.div`
padding: 10px 5px;
height: 30%;
display: flex;
flex-direction: column;`

const Description = styled.div`
font-size: 1.2rem;
margin: 7px 0;

 &:hover {
    color: blue; 
  }

`
const NameWrapper = styled.div`
display:flex;
align-items: center;
justify-content: space-between;`

const PriceSec = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 5px 20px 0px 0px`

const Price = styled.div`
font-size: 1.6rem;
font-weight: 700;`


const Name = styled.div`
font-size: 1.6rem;
font-weight: 700;`

const Brand = styled.div`
font-weight: 600;`

const Stars = styled.div`
background-color:green;
color: white;
border-radius: 10px;
padding: 4px 8px;`


function ProductsCard({item}: {item: Product}) {
    const {id,name,description,price,main_image} = item

   
  return (
    <Wrapper href={`product/${id}`}>
        <ImgWrapper>
        <Img src={main_image} />
        </ImgWrapper>
        <InfoSec>
            <NameWrapper>
                <Brand></Brand>
                <span>{name}</span>
            </NameWrapper>
            <Description>{description}</Description>
            <PriceSec>
                <Price>{price}</Price>
            </PriceSec>


        </InfoSec>


        


    </Wrapper>
  )
}

export default ProductsCard