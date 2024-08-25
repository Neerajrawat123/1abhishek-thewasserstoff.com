import React from 'react'
import styled from 'styled-components';
import Carousal from './Carousal';
import data from '../../lib/data.json'
import Card from './Cards';

const RelatedProductSec = styled.div`
  padding:  20px 50px 70px;
  border-bottom: 1px solid gray;
`;

const Heading = styled.h2`
font-size: 2.5rem;
margin-bottom: 2rem;
font-weight: 700;`

function RelatedProduct() {
  return (
<RelatedProductSec>
        <Heading>Products related to this item</Heading>
        <Carousal>
          {data.map((product) => (
            <Card key={product.id} item={product} />
          ))}{" "}
        </Carousal>
      </RelatedProductSec>  )
}

export default RelatedProduct