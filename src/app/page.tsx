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
  width: 100%;
`;

const ProductsWrapper = styled.div`
height: 100vh;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  gap: 2rem;
  padding: 18px 30px;
`;

export default function Home() {
  const [data, setData ] = useState< Product[]>([])
  const [error ,setError ]= useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  axios.defaults.baseURL = 'https://ca312691e93376c0a86e.free.beeceptor.com/'


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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
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
