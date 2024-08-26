import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Carousal from './Carousal';
import Card from './Cards';
import axios from 'axios';

const RelatedProductSec = styled.div`
  padding:  20px 50px 70px;
  border-bottom: 1px solid gray;
`;

const Heading = styled.h2`
font-size: 2.5rem;
margin-bottom: 2rem;
font-weight: 700;`

const ErrorMsg = styled.div`
font-size: 3rem;
text-align: center;
margin-top: 5rem;`

const LoadingText = styled.p`
font-size: 3rem;
font-weight: 800;
text-align: center;
margin-top: 5rem;`



function RelatedProduct() {

  const [loading, setLoading ] = useState(false)
  const [error, setError] = useState(null)
  const [products, setProducts] = useState([])

  
  useEffect(() => {
    async function fetchData() {

      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_REVIEW_URL as string)
        setLoading(true)
        if(response.status === 200){

          setProducts(response.data)
          setLoading(false)
        }
        
      } catch (error as Error) {
        console.log(error)
        setError(error)
        
      }
     
    }

    fetchData()
  },[])

  if (loading) return <LoadingText>Loading...</LoadingText>;
  if (error) return <ErrorMsg>Error: {error.message}</ErrorMsg>;
  return (
<RelatedProductSec>
        <Heading>Products related to this item</Heading>
        <Carousal>
          {products.map((product) => (
            <Card key={product.id} item={product} />
          ))}{" "}
        </Carousal>
      </RelatedProductSec>  )
}

export default RelatedProduct