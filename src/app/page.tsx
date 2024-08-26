"use client";
import styled from "styled-components";
import Header from "./components/Header";
import ProductsCard from "./components/ProductsCard";
import { useEffect, useState } from 'react'


// import { store } from "./store/productStore";
import axios from "axios";
import { fetchAllProducts } from "@/lib/api";

interface Product  {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  main_image: string;
 other_images: string[];


}




const MainWrapper = styled.main`
  width: 100%vw;
  overflow: none;
`;

const ProductsWrapper = styled.div`
height: 100vh;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  gap: 2rem;
  padding: 18px 30px;

  @media only screen and (max-width: 768px) 
  {
    display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  }
`;

const ErrorMsg = styled.div`
font-size: 3rem;
text-align: center;
margin-top: 5rem;`

const LoadingText = styled.p`
font-size: 3rem;
font-weight: 800;
text-align: center;
margin-top: 5rem;`


export default function Home() {
  const [data, setData ] = useState< Product[]>([])
  const [error ,setError ]= useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_PRODUCT_URL


  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const products = await fetchAllProducts();
        setData(products);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();  
  
  }, [])

  if (loading) return <LoadingText>Loading...</LoadingText>;
  if (error) return <ErrorMsg>Error: {error.message}</ErrorMsg>;
  
  return (

      <MainWrapper>
        <Header />
        <ProductsWrapper>
          {data.map((product) => (
            <ProductsCard key={product.id} item={product} />
          ))}
        </ProductsWrapper>
      </MainWrapper>

  );
}
